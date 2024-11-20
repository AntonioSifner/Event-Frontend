"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import UserComment from "@/components/user_comment";
import { useAuth } from "@/contexts/authContext";
import { useState } from "react";
import { COMMENTS_ENDPOINT, EVENTS_ENDPOINT } from "@/api/endpoints";
import CommentList from "@/components/commentList";
import { addUserToEvent, removeUserFromEvent } from "@/api/api";

const EventDetails = ({ params }) => {
  const { isLoggedIn, getUserIDFromLocalStorage, getTokenFromLocalStorage } =
    useAuth();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const id = params.id;
  const [isGoingChipSelected, setisGoingChipSelected] = useState(false);

  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn());
    fetchEventDetails();
    fetchComments();
  }, []);

  useEffect(() => {
    if (eventDetails) {
      checkUserAttendance();
    }
  }, [eventDetails]);
  useEffect(() => {}, [isGoingChipSelected]);

  const fetchEventDetails = async () => {
    try {
      const url = `${EVENTS_ENDPOINT}/${id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEventDetails(data);
        console.log(data.imagePath);
      } else {
        console.error("Error fetching events", response.status);
        console.error("Error fetching events", response.body);
        console.error("Error fetching events", response);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const url = `${COMMENTS_ENDPOINT}/${id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const comments = await response.json();
        setComments(comments);
      } else {
        console.error("Error fetching events", response.status);
        console.error("Error fetching events", response.body);
        console.error("Error fetching events", response);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleToggle = async () => {
    const userId = getUserIDFromLocalStorage();
    const userToken = getTokenFromLocalStorage();

    const isUserAttending = eventDetails?.users.some(
      (user) => user.id === userId
    );

    try {
      if (isUserAttending) {
        await removeUserFromEvent(eventDetails.id, userId, userToken);
      } else {
        await addUserToEvent(eventDetails.id, userId, userToken);
      }

      setEventDetails((prevEventDetails) => {
        const updatedEventDetails = { ...prevEventDetails };

        if (isUserAttending) {
          updatedEventDetails.users = updatedEventDetails.users.filter(
            (user) => user.id !== userId
          );
        } else {
          updatedEventDetails.users = [
            ...updatedEventDetails.users,
            { id: userId },
          ];
        }

        return updatedEventDetails;
      });

      setisGoingChipSelected(!isUserAttending);
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  const checkUserAttendance = () => {
    const userId = getUserIDFromLocalStorage();
    if (eventDetails?.users.some((user) => user.id === userId)) {
      setisGoingChipSelected(true);
    }
  };

  const onCommentAdded = () => {
    fetchComments();
  }

  return (
    <>
      <div className="mx-60">
        <div className="flex p-20 ">
          <div className="flex-1">
            <div className="flex flex-row justify-between">
              <p className="text-black text-4xl font-bold">
                {eventDetails?.name}
              </p>

              <div className="mr-8">
                <p className="text-black text-lg text-right font-bold">
                  Vrsta događaja:
                </p>
                <p className="text-black text-lg text-right">
                  {eventDetails?.eventType?.name}
                </p>
              </div>
            </div>

            <p className="text-black text-lg ">
              <span className="font-bold">Datum: </span>
              {eventDetails?.date &&
                new Date(eventDetails.date).toLocaleDateString()}{" "}
            </p>
            <p className="text-black text-lg mb-6">
              <span className="font-bold">Vrijeme: </span>
              {eventDetails?.date &&
                new Date(eventDetails.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
            </p>

            <div className="flex flex-row justify-between">
              <div>
                <p className="text-black text-lg">
                  Dvorana Gradski vrt, Osijek
                </p>
                <p className="text-black text-lg">
                  <span className="font-bold">Adresa: </span>
                  {eventDetails?.address}
                </p>
              </div>
              <div className="mr-8">
                <p className="text-black text-lg text-right font-bold">Ulaz:</p>
                <p className="text-black text-lg text-right">
                  {eventDetails?.price} €
                </p>
              </div>
            </div>

            <hr className="h-0.5 my-8  border-0 bg-gray-700" />

            <div className="flex items-center justify-center">
              <p className="text-center text-black my-2">
                {eventDetails?.description}
              </p>
            </div>

            <hr className="h-0.5 my-8  border-0 bg-gray-700" />

            <div className="flex flex-row justify-between">
              <div className="flex items-center">
                {isUserLoggedIn && (
                  <>
                    <div
                      onClick={handleToggle}
                      className={`cursor-pointer flex items-center ${
                        isGoingChipSelected ? "bg-green-500" : "bg-gray-200"
                      } rounded-full py-2 px-4`}
                    >
                      <span
                        className={`text-black ${
                          isGoingChipSelected ? "text-white" : ""
                        }`}
                      >
                        Idem
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className=" flex flex-row">
                <img
                  className=" mr-4"
                  src="/people_icon.png"
                  alt="Profile Icon"
                  width="30"
                  height="30"
                />
                <p className="text-black text-lg text-right">
                  {eventDetails?.users.length}
                </p>
              </div>
            </div>
          </div>

          <div className=" flex-col ml-8">
            <img
              className="rounded-md"
              src={eventDetails?.imagePath}
              alt="Event"
              width={350}
              height={600}
            />
          </div>
        </div>
        <div className="ml-8">
          <p className="text-left text-lg font-bold text-black my-2 ml-10">
            Komentari
          </p>
          <div className="flex-col justify-center">
            <UserComment eventId={id} onCommentAdded={onCommentAdded}/>
            <CommentList comments={comments} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
