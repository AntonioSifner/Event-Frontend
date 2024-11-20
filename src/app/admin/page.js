"use client";

import InputField from "@/components/inputField";
import React, { useEffect, useState, useRef } from "react";
import SelectField from "@/components/admin/selectField";
import DateField from "@/components/datePicker";
import TextareaField from "@/components/textareaField";
import { eventCardStyle, detailsButtonStyle, inputStyle } from "../styles";
import { EVENTS_ENDPOINT, EVENT_IMAGE_ENDPOINT } from "@/api/endpoints";
import { useAuth } from "@/contexts/authContext";
import { fetchEvents, fetchEventTypes } from "@/api/api";
import AdminEventList from "@/components/admin/adminEventList";
import LoadingSkeletonEventList from "@/components/loadingSkeletonEventList";
import EventTypesManagment from "@/components/admin/eventTypesManagment";
import { useRouter } from "next/navigation";

const Admin = ({}) => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [eventTypeId, setEventTypeId] = useState("");
  const [description, setDescription] = useState("");
  const [date, setdate] = useState("");
  const [location, setLocation] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [imagePath, setImagePath] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);

  const { getTokenFromLocalStorage, getUserIDFromLocalStorage } = useAuth();
  const userToken = getTokenFromLocalStorage();

  const [fillAllError, setFillAllError] = useState(false);
  const [isAddingEvents, setIsAddingEvent] = useState(false);
  const fileRef = useRef();

  const router = useRouter();

  const handleImageAsFile = (e) => {
    setEventImage(e.target.files[0]);
  };

  useEffect(() => {
    if (getUserIDFromLocalStorage() !== "okwjVzEPE0W4BdLcJflYDIqkgR53") {
      router.replace("/login");
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (!isAddingEvents) {
      resetFields();
    }
  }, [isAddingEvents]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const eventData = await fetchEvents();
      setEvents(eventData);
      const eventTypesData = await fetchEventTypes();
      setEventTypes(eventTypesData);
    } finally {
      setIsLoading(false);
    }
  };

  const resetFields = () => {
    setName("");
    setCity("");
    setAddress("");
    setPrice(0);
    setEventTypeId("");
    setDescription("");
    setdate("");
    setLocation("");
    fileRef.current.value = null;
    setImagePath("");
  };

  const handleAddEvent = async () => {
    if (!checkIfAllFieldsAreFilled()) {
      setFillAllError("Molimo popunite sva polja");
      setTimeout(() => {
        setFillAllError("");
      }, 3000);
      return;
    }
    setFillAllError("");
    setIsAddingEvent(true);

    const imagePath = await handleImageUpload();

    const temp = JSON.stringify({
      address,
      city,
      date: new Date(date).toISOString(),
      description,
      eventTypeId,
      imagePath,
      location,
      name,
      price,
    });

    try {
      const url = `${EVENTS_ENDPOINT}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: temp,
      });

      if (response.ok) {
        const data = await response.json();
        resetFields();
        fetchData();
        setIsAddingEvent(false);
      } else {
        console.error("Error adding events", response.status);
        console.error("Error adding events", response.body);
        console.error("Error adding events", response);
      }
    } catch (error) {
      console.error("Error adding events", error);
    }
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", eventImage);

      const response = await fetch(EVENT_IMAGE_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.text();
        return data;
      } else {
        console.error("Image upload failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  const onEventDelete = (eventID) => {
    const newEvents = events.filter((event) => event.id !== eventID);
    setEvents(newEvents);
  };

  const checkIfAllFieldsAreFilled = () => {
    return (
      name &&
      city &&
      address &&
      price &&
      eventTypeId &&
      description &&
      date &&
      location &&
      eventImage
    );
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div
          className="bg-white p-12 my-8 rounded-lg w-4/5 border-none focus:border-none"
          style={eventCardStyle}
        >
          <p className="text-black text-xl font-bold text-center">
            Dodavanje događaja
          </p>

          <div className="flex justify-between">
            <InputField
              name="eventName"
              label="Naziv događaja"
              placeholder="Upišite naziv događaja..."
              type={"text"}
              className="w-full "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <SelectField
              label="Vrsta događaja"
              options={eventTypes.map((eventType) => ({
                label: eventType.name,
                value: eventType.id,
              }))}
              value={eventTypeId}
              onChange={(e) => setEventTypeId(e.target.value)}
            />

            <DateField
              label="Datum događanja"
              name="date"
              value={date}
              onChange={(e) => setdate(e.target.value)}
            />
          </div>

          <div className="flex justify-between">
            <div className="w-full mr-5">
              <InputField
                name="eventName"
                label="Grad"
                placeholder="Upišite naziv grada..."
                type={"text"}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="w-full ml-5">
              <InputField
                name="location"
                label="Lokacija"
                placeholder="Upišite naziv lokacije..."
                type={"text"}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <InputField
            name="eventName"
            label="Adresa"
            placeholder="Upišite adresu..."
            type={"text"}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <InputField
            name="eventName"
            label="Cijena"
            placeholder="Upišite cijenu..."
            type={"number"}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <TextareaField
            label="Opis događaja"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex justify-center ">
            <div className="flex-col w-3/5">
              <p className="text-black text-center my-2">Slika:</p>
              <input
                type="file"
                accept="image/*"
                name="eventImage"
                ref={fileRef}
                className="form-input text-black w-full rounded-lg placeholder-white border-none mb-6"
                onChange={handleImageAsFile}
              />
            </div>
          </div>
          <div className="flex justify-center">
            {fillAllError && (
              <div
                className="p-4 mb-4 text-md text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 w-2/5"
                role="alert"
              >
                <span className="font-medium">{fillAllError}</span>
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-light py-1 px-8 rounded rounded-lg`}
              style={detailsButtonStyle}
              onClick={handleAddEvent}
              disabled={isAddingEvents}
            >
              {isAddingEvents ? "Dodavanje događaja..." : "Dodaj događaj"}
            </button>
          </div>
        </div>
      </div>

      <EventTypesManagment />

      <LoadingSkeletonEventList isLoading={isLoading} skeletonNumber={4} />

      <div className="flex flex-col items-center justify-center">
        {events && events.length > 0 ? (
          <AdminEventList events={events} onEventDelete={onEventDelete} />
        ) : (
          <p className="text-black text-lg text-center font-bold">
            No events found.
          </p>
        )}
      </div>
    </>
  );
};

export default Admin;
