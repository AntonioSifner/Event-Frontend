"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import { useState, useEffect } from "react";
import { eventCardStyle, inputStyle, detailsButtonStyle } from "@/app/styles";
import { COMMENTS_ENDPOINT } from "@/api/endpoints";

const UserComment = ({ eventId, onCommentAdded }) => {
  const commentButtonStyle = {
    backgroundColor: "rgb(217, 217, 217)",
  };

  const { isLoggedIn, getUserIDFromLocalStorage, getTokenFromLocalStorage } =
    useAuth();
  const userId = getUserIDFromLocalStorage();
  const userToken = getTokenFromLocalStorage();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn());
  }, []);

  const handleAddMessage = async () => {
    const userComment = JSON.stringify({
      message,
      eventId,
      userId,
    });

    try {
      const url = `${COMMENTS_ENDPOINT}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: userComment,
      });

      if (response.ok) {
        onCommentAdded();
        setMessage("");
      } else {
        console.error("Error adding events", response.status);
        console.error("Error adding events", response.body);
        console.error("Error adding events", response);
      }
    } catch (error) {
      console.error("Error adding events", error);
    }
  };

  return (
    <div
      className="flex bg-white p-6 mx-10 my-8 rounded-lg w-11/12 border-none focus:border-none"
      style={commentButtonStyle}
    >
      {isUserLoggedIn ? (
        <div className="w-full flex flex-col items-end">
          <textarea
            id="message"
            className="text-black rounded-lg border-none w-full min-h-12
            "
            placeholder="Ostavi svoj komentar ..."
            style={eventCardStyle}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          ></textarea>
          <button
            className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded mt-2 text-ls mt-2"
            style={detailsButtonStyle}
            onClick={handleAddMessage}
          >
            Komentiraj
          </button>
        </div>
      ) : (
        <Link href="/login" className="w-full">
          <textarea
            id="message"
            className="text-black rounded-lg border-none w-full"
            placeholder="Ostavi svoj komentar ..."
            style={eventCardStyle}
          ></textarea>
        </Link>
      )}
    </div>
  );
};

export default UserComment;
