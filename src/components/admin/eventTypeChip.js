"use client";

import React from "react";
import { detailsButtonStyle } from "@/app/styles";
import { removeEventType } from "@/api/api";
import { useAuth } from "@/contexts/authContext";

const EventTypeChip = ({ eventType, onEventTypeDelete }) => {

  const { getTokenFromLocalStorage } = useAuth();
  const userToken = getTokenFromLocalStorage();
  const handleRemoveEventType = async () => {
    const responseStatus = await removeEventType(eventType.id, userToken);
    if (responseStatus == 200) {
      onEventTypeDelete(eventType.id);
    }
  };

  return (
    <div className="inline-flex items-center h-8 overflow-hidden text-white bg-blue-500 rounded-lg mr-3 mb-3">
      <span
        className="px-5 py-1.5 text-[15px] font-medium "
        style={detailsButtonStyle}
      >
        {eventType?.name}
      </span>

      <button
        className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 transition-color hover:bg-blue-700 focus:outline-none focus:ring"
        type="button"
        style={detailsButtonStyle}
        onClick={handleRemoveEventType}
      >
        <span className="sr-only"> Close </span>

        <svg
          className="w-3 h-3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default EventTypeChip;
