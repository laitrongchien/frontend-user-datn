"use client";

import { useState, useEffect } from "react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { tourService } from "@/services/api/tour";
import HorizTourCard from "@/components/card/HorizTourCard";
import { MdOutlineClose } from "react-icons/md";
import Modal from "@/components/global/Modal";
import Loading from "@/components/global/Loading";

const FavoriteTours = () => {
  const [loading, setLoading] = useState(false);
  const [favoriteTours, setFavoriteTours] = useState<any[]>([]);
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);
  useEffect(() => {
    const getFavoriteTours = async () => {
      setLoading(true);
      const res = await tourService.getFavoriteTours();
      setLoading(false);
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
        <div className="rounded-lg px-10 py-4 w-full h-full bg-white shadow-md">
          {loading ? (
            <Loading />
          ) : favoriteTours.length === 0 ? (
            <div className="h-full flex-center">
              <span className="text-[18px] font-semibold">
                Danh sách tour yêu thích trống
              </span>
            </div>
          ) : (
            favoriteTours.map((favoriteTour: any) => (
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
            ))
          )}
        </div>
      </ProfileLayout>

      <Modal>
        <h3 className="font-bold text-lg">Xóa tour yêu thích này</h3>
        <p className="py-4">
          Bạn chắc chắn muốn xóa tour này khỏi danh sách yêu thích chứ?
        </p>
        <div className="flex justify-end">
          <form method="dialog">
            <button className="btn" onClick={confirmDeleteTour}>
              Xác nhận
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default FavoriteTours;
