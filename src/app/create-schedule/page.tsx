"use client";

import { useState } from "react";
import QuillEditor from "@/components/editor/QuillEditor";
import MapTracking from "@/components/map/MapTracking";
import SelectLocation from "@/components/tour/SelectLocation";
import { MdAddCircleOutline, MdClose } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { tourService } from "@/services/api/tour";
import { toast } from "react-toastify";

const CreateSchedule = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [content, setContent] = useState("");
  const [numberPeople, setNumberPeople] = useState(0);
  const [name, setName] = useState("");
  const [startLocation, setStartLocation] = useState<any>(null);
  const [stopLocations, setStopLocations] = useState<any[]>([]);
  const [endLocation, setEndLocation] = useState<any>(null);

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
        name,
        numberPeople,
        description: content,
      });
      console.log(endLocation);

      toast.success("Tạo lịch trình thành công");
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
    <div className="px-10 py-6 flex max-md:flex-col gap-12">
      <form
        className="w-full md:w-[50%] max-h-[480px] py-4 overflow-y-scroll overflow-x-hidden"
        onSubmit={handleSubmit}
      >
        <h1 className="text-[20px] text-center font-semibold mb-4">
          Tự tạo lịch trình của bạn
        </h1>
        <div className="grid grid-cols-1 gap-y-4 pr-8">
          <SelectLocation
            placeholder="Chọn địa điểm xuất phát"
            setLocation={setStartLocation}
            required
          />
          {stopLocations.map((location) => (
            <div key={location.id} className="relative">
              <SelectLocation
                placeholder="Chọn địa điểm dừng chân"
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
          <button
            type="button"
            onClick={handleAddLocation}
            className="mt-[-4px] flex gap-2"
          >
            <MdAddCircleOutline size={24} />
            <span>Thêm địa điểm</span>
          </button>
          <SelectLocation
            placeholder="Chọn địa điểm kết thúc"
            setLocation={setEndLocation}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-4 pr-8">
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
          <div>
            <label className="mb-1 inline-block">Tên lịch trình</label>
            <input
              required
              onChange={(e) => setName(e.target.value)}
              className="p-1.5 border border-gray-400 rounded-lg w-full outline-none"
            />
          </div>
          <div>
            <label className="mb-1 inline-block">Số người tham gia</label>
            <input
              type="number"
              required
              onChange={(e) => setNumberPeople(Number(e.target.value))}
              className="p-1.5 border border-gray-400 rounded-lg w-full outline-none"
            />
          </div>
        </div>
        <div className="mt-4 pr-8">
          <label className="mb-1 inline-block">Mô tả lộ trình</label>
          <QuillEditor content={content} setContent={setContent} />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-primary rounded-lg text-white mt-4 float-right mr-8"
        >
          Lưu lịch trình
        </button>
      </form>
      <div className="w-full md:w-[50%] flex-center h-[480px]">
        <MapTracking
          startLocation={startLocation}
          endLocation={endLocation}
          stopLocations={stopLocations}
          showUserLocation
        />
      </div>
    </div>
  );
};

export default CreateSchedule;
