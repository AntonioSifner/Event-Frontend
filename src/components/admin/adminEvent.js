import React from "react";
import { useRouter } from "next/navigation";
import { eventCardStyle, detailsButtonStyle } from "@/app/styles";
import { deleteEvent } from "@/api/api";
import { useAuth } from "@/contexts/authContext";

const AdminEvent = ({ event, onEventDelete }) => {
  const eventDate = new Date(event.date);

  const router = useRouter();

  const { getTokenFromLocalStorage } = useAuth();
  const userToken = getTokenFromLocalStorage();

  const handleDetailsClick = () => {
    router.push(`/event_details/${event.id}`);
  };

  const handleDeleteEvent = async () => {
    const responseStatus = await deleteEvent(event.id, userToken);
    if (responseStatus == 200) {
      onEventDelete(event.id);
    }
  };

  return (
    <div
      className="flex flex-row items-center bg-white p-6 m-6 rounded-lg  w-3/4 border-none"
      style={eventCardStyle}
    >
      <div className="ml-4">
        {event.imagePath && (
          <img
            src={event.imagePath}
            className="w-24 h-24 object-cover rounded-md"
          />
        )}
      </div>

      <div className="m-4">
        <p className="text-black text-lg">
          {event?.date && new Date(event.date).toLocaleTimeString()}{" "}
        </p>
        <p className="text-black text-lg mt-6">
          {event?.date && new Date(event.date).toLocaleDateString()}{" "}
        </p>
      </div>
      <div className="text-black text-lg flex-1"></div>

      <p className="text-black text-lg mr">{event.name}</p>
      <div className="flex-1"></div>

      <div className="flex flex-col">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white  font-light py-1 px-8 rounded mr-4 mb-4 rounded-lg"
          style={detailsButtonStyle}
          onClick={handleDetailsClick}
        >
          DETALJI
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white  font-light py-1 px-8 rounded mr-4 rounded-lg"
          onClick={handleDeleteEvent}
        >
          OBRIŠI
        </button>
      </div>
    </div>
  );
};

export default AdminEvent;
