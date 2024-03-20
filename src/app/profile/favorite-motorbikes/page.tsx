"use client";

import { useState, useEffect } from "react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { motorbikeService } from "@/services/api/motorbike";
import MotorbikeCard from "@/components/card/MotorbikeCard";
import { MdOutlineClose } from "react-icons/md";
import Modal from "@/components/global/Modal";

const FavoriteMotorbikes = () => {
  const [favoriteMotorbikes, setFavoriteMotorbikes] = useState<any[]>([]);
  const [selectedMotorbikeId, setSelectedMotorbikeId] = useState<string | null>(
    null
  );
  useEffect(() => {
    const getFavoriteMotorbikes = async () => {
      const res = await motorbikeService.getFavoriteMotorbikes();
      console.log(res);
      setFavoriteMotorbikes(res.data);
    };
    getFavoriteMotorbikes();
  }, []);

  const handleDeleteMotorbike = (motorbikeId: string) => {
    setSelectedMotorbikeId(motorbikeId);
  };

  const confirmDeleteMotorbike = async () => {
    if (selectedMotorbikeId) {
      setFavoriteMotorbikes((prevMotorbikes) =>
        prevMotorbikes.filter(
          (motorbike) => motorbike.motorbike._id !== selectedMotorbikeId
        )
      );
      await motorbikeService.unlikeMotorbike(selectedMotorbikeId);
      setSelectedMotorbikeId(null);
    }
  };

  return (
    <>
      <ProfileLayout>
        <div className="rounded-lg px-10 py-4 w-full bg-white shadow-md">
          {favoriteMotorbikes.map((favoriteMotorbike: any) => (
            <div
              key={favoriteMotorbike.motorbike._id}
              className="mb-12 relative"
            >
              <MotorbikeCard
                motorbike={favoriteMotorbike.motorbike}
                hideHeartIcon={true}
              />
              <button
                className="absolute top-2 left-2 flex-center p-1 bg-white rounded-full border border-gray-500"
                onClick={() => {
                  handleDeleteMotorbike(favoriteMotorbike.motorbike._id);
                  (
                    document.getElementById("my_modal_2") as HTMLDialogElement
                  )?.showModal();
                }}
              >
                <MdOutlineClose size={20} />
              </button>
            </div>
          ))}
        </div>
      </ProfileLayout>

      <Modal>
        <h3 className="font-bold text-lg">Xóa xe motor yêu thích này</h3>
        <p className="py-4">
          Bạn chắc chắn muốn xóa xe này này khỏi danh sách yêu thích chứ?
        </p>
        <div className="flex justify-end">
          <form method="dialog">
            <button className="btn" onClick={confirmDeleteMotorbike}>
              Xác nhận
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default FavoriteMotorbikes;
