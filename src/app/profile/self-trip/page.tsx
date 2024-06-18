"use client";

import { useMemo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { tourService } from "@/services/api/tour";

const localizer = momentLocalizer(moment);

const SelfTour = () => {
  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(),
      views: Object.values(Views),
    }),
    []
  );
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getAllSelfTours = async () => {
      const res = await tourService.getAllSelfTours();
      const myEvents = res.data.map((selfTour: any) => ({
        id: selfTour._id,
        title: selfTour.name,
        start: new Date(selfTour.startDate),
        end: new Date(selfTour.endDate),
      }));
      setEvents(myEvents);
    };
    getAllSelfTours();
  }, []);

  const handleSelectSelfTour = (selfTour: any) => {
    router.push(`/profile/self-trip/${selfTour.id}`);
  };

  return (
    <ProfileLayout>
      <div className="rounded-lg p-4 w-full h-[600px] bg-white shadow-md">
        <Calendar
          localizer={localizer}
          step={60}
          defaultDate={defaultDate}
          views={views}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectSelfTour}
        />
      </div>
    </ProfileLayout>
  );
};

export default SelfTour;
