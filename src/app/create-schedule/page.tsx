"use client";

import { useState, useRef } from "react";
import QuillEditor from "@/components/editor/QuillEditor";
import MapTracking from "@/components/map/MapTracking";
import SelectLocation from "@/components/tour/SelectLocation";
import { MdAddCircleOutline, MdClose } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { tourService } from "@/services/api/tour";
import { toast } from "react-toastify";
import { motorbikeService } from "@/services/api/motorbike";
import { useAppSelector } from "@/store/hooks";

const CreateSchedule = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [content, setContent] = useState("");
  const [startLocation, setStartLocation] = useState<any>(null);
  const [stopLocations, setStopLocations] = useState<any[]>([]);
  const [endLocation, setEndLocation] = useState<any>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [suggestMotorbikes, setSuggestMotorbikes] = useState([]);
  const motorbikeSectionRef = useRef<any>(null);
  const { user } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await tourService.createSelfTour({
        startLocation,
        stopLocations: stopLocations.map(({ description, coordinates }) => ({
          description,
          coordinates,
        })),
        endLocation,
        startDate,
        endDate,
        description: content,
      });

      toast.success("Đã lưu lại lịch trình của bạn");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSuggestMotorbike = async () => {
    try {
      const res = await motorbikeService.getSuggestMotorbikes(distance! / 1000);
      setSuggestMotorbikes(res.data);
      motorbikeSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddLocation = () => {
    setStopLocations((prevLocations) => [
      ...prevLocations,
      { id: uuidv4(), coordinates: null, description: "" },
    ]);
  };

  const handleRemoveLocation = (id: string) => {
    setStopLocations((prevLocations) =>
      prevLocations.filter((location) => location.id !== id)
    );
  };

  const handleUpdateLocation = (id: string, newLocation: any) => {
    setStopLocations((prevLocations) =>
      prevLocations.map((location) =>
        location.id === id ? { ...location, ...newLocation } : location
      )
    );
    if (!newLocation) {
      setStopLocations((prevLocations) =>
        prevLocations.map((location) =>
          location.id === id
            ? { ...location, coordinates: null, description: "" }
            : location
        )
      );
    }
  };

  return (
    <>
      <div className="px-6 md:px-10 py-6 flex max-md:flex-col-reverse gap-12">
        <form
          className="w-full md:w-[50%] max-h-[480px] pt-2 pb-4 overflow-y-scroll overflow-x-hidden"
          onSubmit={handleSubmit}
        >
          <h1 className="text-[20px] text-center font-semibold mb-4">
            Tìm kiếm xe phù hợp với lịch trình của bạn
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-2 pr-8">
            <div>
              <label className="mb-1 inline-block">Ngày bắt đầu</label>
              <input
                type="date"
                min={
                  new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]
                }
                onChange={(e) => setStartDate(new Date(e.target.value))}
                required
                className="p-1.5 border border-gray-400 rounded-lg w-full outline-none"
              />
            </div>
            <div>
              <label className="mb-1 inline-block">Ngày kết thúc</label>
              <input
                type="date"
                min={startDate.toISOString().split("T")[0]}
                onChange={(e) => setEndDate(new Date(e.target.value))}
                required
                className="p-1.5 border border-gray-400 rounded-lg w-full outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-4 pr-8 mt-4">
            <SelectLocation
              placeholder="Nhập địa điểm xuất phát"
              setLocation={setStartLocation}
              required
            />
            {stopLocations.map((location) => (
              <div key={location.id} className="relative">
                <SelectLocation
                  placeholder="Nhập địa điểm dừng chân"
                  setLocation={(newLocation: any) =>
                    handleUpdateLocation(location.id, newLocation)
                  }
                  required
                />
                <div
                  className="tooltip tooltip-bottom absolute left-[calc(100%+8px)] top-2"
                  data-tip="Xóa địa điểm này"
                >
                  <button onClick={() => handleRemoveLocation(location.id)}>
                    <MdClose size={24} />
                  </button>
                </div>
              </div>
            ))}
            <div>
              <button
                type="button"
                onClick={handleAddLocation}
                className="mt-[-4px] flex gap-2"
              >
                <MdAddCircleOutline size={24} />
                <span>Thêm địa điểm dừng chân</span>
              </button>
            </div>
            <SelectLocation
              placeholder="Nhập địa điểm kết thúc"
              setLocation={setEndLocation}
              required
            />
          </div>
          <div className="mt-4 pr-8">
            <label className="mb-1 inline-block">Mô tả</label>
            <QuillEditor
              content={content}
              setContent={setContent}
              placeholder="Ghi chú của bạn về lộ trình, điểm đến,..."
            />
          </div>
          <div className="mt-4 float-right mr-8">
            <button
              type="button"
              onClick={handleSuggestMotorbike}
              disabled={!startLocation || !endLocation}
              className={`px-4 py-2 border rounded-lg ${
                !startLocation || !endLocation
                  ? "bg-gray-300"
                  : "border-primary text-primary"
              }`}
            >
              Tìm kiếm xe
            </button>
            {user && (
              <button
                type="submit"
                className="px-4 py-2 bg-primary rounded-lg text-white ml-4"
              >
                Lưu lịch trình
              </button>
            )}
          </div>
        </form>
        <div className="w-full md:w-[50%] flex-center h-[480px]">
          <MapTracking
            startLocation={startLocation}
            endLocation={endLocation}
            stopLocations={stopLocations}
            distance={distance}
            setDistance={setDistance}
            showUserLocation
          />
        </div>
      </div>
      <div
        className="w-full md:w-[50%] px-6 md:px-10"
        ref={motorbikeSectionRef}
      >
        {suggestMotorbikes.map((suggestMotor: any) => (
          <div key={suggestMotor._id} className="mb-4">
            <span className="text-sm font-semibold min-w-40 max-w-40 inline-block">
              {suggestMotor.name}
            </span>
            <a
              href={`/motorbikes/${suggestMotor._id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold ml-8"
            >
              Thuê xe
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default CreateSchedule;
