import { fetchUserData } from "@/api/api";
import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { eventCardStyle } from "@/app/styles";

const Comment = ({ comment }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserName();
  }, []);

  const getUserName = async () => {
    const data = await fetchUserData(comment.userId);
    setUser(data);
  };

  return (
    <div
      className="flex bg-white p-6 mx-10 my-8 rounded-lg   w-11/12 border-none "
      style={eventCardStyle}
    >
      <div className="flex flex-col">
        <p className="text-black text-lg text-left font-bold">
          {user?.firstName} {user?.lastName}
        </p>
        <p className="text-black text-lg text-left my-5"> {comment?.message}</p>
      </div>
    </div>
  );
};

export default Comment;
