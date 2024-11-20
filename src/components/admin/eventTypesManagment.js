"use client";

import InputField from "@/components/inputField";
import React, { useEffect, useState } from "react";
import { eventCardStyle, detailsButtonStyle } from "@/app/styles";
import { useAuth } from "@/contexts/authContext";
import EventTypeChipList from "./eventTypeChipsList";
import { addEventType, fetchEventTypes } from "@/api/api";

const EventTypesManagment = ({}) => {
  const [eventType, setEventType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [eventTypes, setEventTypes] = useState([]);

  const { getTokenFromLocalStorage } = useAuth();
  const userToken = getTokenFromLocalStorage();
  useEffect(() => {
    fetchEventTypesData();
  }, []);

  const fetchEventTypesData = async () => {
    try {
      setIsLoading(true);
      const eventTypesData = await fetchEventTypes();
      setEventTypes(eventTypesData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEventType = async () => {
    await addEventType(eventType, userToken);
    await fetchEventTypesData();
    setEventType("");
  };
  const onEventTypeDelete = () => {
    fetchEventTypesData();
  };
  return (
    <>
      <div className="flex items-center justify-center">
        <div
          className="bg-white p-12 my-8 rounded-lg w-4/5 border-none focus:border-none"
          style={eventCardStyle}
        >
          <p className="text-black text-xl font-bold text-center">Upravljanje vrstama događaja</p>

          <div className="flex justify-between">
            <InputField
              name="eventName"
              label="Vrsta događaja"
              placeholder="Upišite naziv događaja..."
              type={"text"}
              className="w-full "
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            />
          </div>

          <EventTypeChipList
            eventTypes={eventTypes}
            onEventTypeDelete={onEventTypeDelete}
          />

          <div className="flex justify-center">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-light py-1 px-8 rounded rounded-lg`}
              style={detailsButtonStyle}
              onClick={handleAddEventType}
            >
              Dodaj
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventTypesManagment;
