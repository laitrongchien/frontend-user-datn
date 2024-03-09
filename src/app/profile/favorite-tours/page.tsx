"use client";

import { useState, useEffect } from "react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { tourService } from "@/services/api/tour";
import HorizTourCard from "@/components/card/HorizTourCard";
import { MdOutlineClose } from "react-icons/md";
import Modal from "@/components/global/Modal";

const ProfileInfo = () => {
  const [favoriteTours, setFavoriteTours] = useState<any[]>([]);
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);
  useEffect(() => {
    const getFavoriteTours = async () => {
      const res = await tourService.getFavoriteTours();
      console.log(res);
      setFavoriteTours(res.data);
    };
    getFavoriteTours();
  }, []);

  const handleDeleteTour = (tourId: string) => {
    setSelectedTourId(tourId);
  };

  const confirmDeleteTour = async () => {
    if (selectedTourId) {
      setFavoriteTours((prevTours) =>
        prevTours.filter((tour) => tour.tour._id !== selectedTourId)
      );
      await tourService.unlikeTour(selectedTourId);
      setSelectedTourId(null);
    }
  };

  return (
    <>
      <ProfileLayout>
        <div className="rounded-lg px-10 py-4 w-full bg-white shadow-md">
          {favoriteTours.map((favoriteTour: any) => (
            <div key={favoriteTour.tour._id} className="mb-12 relative">
              <HorizTourCard tour={favoriteTour.tour} hideHeartIcon={true} />
              <button
                className="absolute top-2 left-2 flex-center p-1 bg-white rounded-full"
                onClick={() => {
                  handleDeleteTour(favoriteTour.tour._id);
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

      <Modal
        title="Xóa tour yêu thích này"
        message="Bạn chắc chắn muốn xóa tour này khỏi danh sách yêu thích chứ?"
        onConfirm={confirmDeleteTour}
      />
    </>
  );
};

export default ProfileInfo;
