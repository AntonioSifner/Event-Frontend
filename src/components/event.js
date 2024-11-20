import React from "react";
import { useRouter } from "next/navigation";
import {
  eventCardStyle,
  detailsButtonStyle,
  highlightedEventStyle,
} from "@/app/styles";

const Event = ({ event, userPreferences }) => {
  const router = useRouter();

  const handleDetailsClick = () => {
    router.push(`/event_details/${event.id}`);
  };

  const isHighlighted =
    userPreferences && userPreferences.includes(event?.eventType?.name);

  return (
    <div
      className={`flex flex-row items-center text-lg bg-white p-6 m-6 rounded-lg  w-3/4 border-none `}
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
          {event?.date && new Date(event.date).toLocaleDateString()}{" "}
        </p>
        <p className="text-black text-lg">
          {event?.date &&
            new Date(event.date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
        </p>
      </div>
      <div className="text-black text-lg flex-1"></div>

      <div>
        {isHighlighted && <div className="  rounded-full py-4 "></div>}
        <p className={`text-black  font-bold  `}>{event.name}</p>{" "}
        {isHighlighted && (
          <div className="text-center  rounded-full py-2">
            <span className="text-green-800 font-bold  text-sm">
              {event.eventType.name}
            </span>
          </div>
        )}
      </div>
      <div className="flex-1"></div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white  font-light py-1 px-8 rounded mr-4 rounded-lg"
        style={detailsButtonStyle}
        onClick={handleDetailsClick}
      >
        DETALJI
      </button>
    </div>
  );
};

export default Event;
