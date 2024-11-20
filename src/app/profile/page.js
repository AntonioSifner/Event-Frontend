"use client";

import React from "react";
import { useAuth } from "@/contexts/authContext";
import { useState, useEffect } from "react";
import { detailsButtonStyle, eventCardStyle } from "../styles";
import { useRouter } from "next/navigation";
import { fetchUserData, fetchEventTypes, updateUser } from "@/api/api";
import Link from "next/link";

const Profile = ({}) => {
  const {
    getTokenFromLocalStorage,
    getUserIDFromLocalStorage,
    logout,
    isLoggedIn,
  } = useAuth();

  const [userData, setUserData] = useState(null);
  const [eventTypes, setEventTypes] = useState([]);
  const [selectedEventTypes, setSelectedEventTypes] = useState([]);

  const router = useRouter();

  const userID = getUserIDFromLocalStorage();
  const userToken = getTokenFromLocalStorage();

  useEffect(() => {
    if (isLoggedIn() == false) {
      router.replace("/login");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetchUserData(userID, userToken);
    const eventTypes = await fetchEventTypes();
    setUserData(data);
    setEventTypes(eventTypes);
    setSelectedEventTypes(data.eventTypeIds);
  };

  const handleLogout = async () => {
    const logoutResponse = await logout();
    if (logoutResponse.ok) {
      router.replace("/login");
    }
  };

  const handleEventTypeToggle = async (eventTypeId) => {
    setSelectedEventTypes((prevSelectedEventTypes) => {
      const updatedSelectedEventTypes = prevSelectedEventTypes.includes(
        eventTypeId
      )
        ? prevSelectedEventTypes.filter((id) => id !== eventTypeId)
        : [...prevSelectedEventTypes, eventTypeId];

      updateUserPreferences(updatedSelectedEventTypes);

      return updatedSelectedEventTypes;
    });
  };

  const updateUserPreferences = async (updatedSelectedEventTypes) => {
    try {
      const updatedUserData = {
        ...userData,
        eventTypeIds: updatedSelectedEventTypes,
      };
      const response = await updateUser(userID, userToken, updatedUserData);
      setUserData(response);
    } catch (error) {
      console.error("Error updating user preferences:", error);
    }
  };
  return (
    <>
      <div className="flex justify-center mt-20">
        <div
          className="flex items-center justify-around w-1/2 rounded-lg p-10"
          style={eventCardStyle}
        >
          <div className="flex-col">
            <p className="text-black text-2xl font-bold my-2">
              {userData ? userData.firstName : ""}{" "}
              {userData ? userData.lastName : ""}
            </p>

            <p className="text-black text-xl mt-5">Grad</p>
            <p className="text-black text-lg mb-5">
              {userData ? userData.city : ""}
            </p>
            <p className="text-black text-xl my-1">Datum rođenja</p>
            <p className="text-black text-lg mb-5">
              {userData && userData.dob
                ? new Date(userData.dob)
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, ".")
                : ""}
            </p>
            <div className="text-black text-xl my-1">
              Preferirani tipovi događaja
              <p className="text-black text-lg mb-5">
                {userData &&
                  userData.eventTypeIds &&
                  userData.eventTypeIds.map((typeId, index) => (
                    <span key={index}>
                      {index > 0 && ", "} {typeId}
                    </span>
                  ))}
              </p>
            </div>

            <button
              className="bg-blue-500  text-white  rounded-lg  px-2 text-lg py-2 mr-4 "
              style={detailsButtonStyle}
              onClick={handleLogout}
            >
              Odjava
            </button>
            {getUserIDFromLocalStorage() == "okwjVzEPE0W4BdLcJflYDIqkgR53" &&
              <button
              className="bg-blue-500 text-white rounded-lg px-2 text-lg py-2 mr-4"
              style={detailsButtonStyle}
            >
              <Link href="/admin">Upravljanje događajima</Link>
            </button>}
          </div>

          <div className="flex flex-col justify-center mb-4">
            {eventTypes.map((eventType) => (
              <div
                key={eventType.id}
                className={`mx-4 flex flex-row my-2 rounded-full py-2 px-3 cursor-pointer transition duration-300 ${
                  selectedEventTypes.includes(eventType.name)
                    ? "bg-blue-500 text-white hover:bg-blue-700 hover:text-white-800"
                    : "bg-gray-300 text-black hover:bg-blue-200 hover:text-blue-800"
                }`}
                onClick={() => handleEventTypeToggle(eventType.name)}
              >
                {eventType.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
