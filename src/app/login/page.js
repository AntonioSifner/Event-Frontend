"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LOGIN_ENDPOINT } from "@/api/endpoints";
import { eventCardStyle, inputStyle, detailsButtonStyle } from "../styles";

const Login = ({}) => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("123456");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();

  const { setUserToken, setIsLoading, setUserID } = useAuth();

  const handleLogin = async () => {
    try {
      setEmailError("");
      setPasswordError("");

      const response = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email, password }),
      });
      if (response.status == 400) {
        const responseMessage = await response.text();
        if (responseMessage == "INVALID_EMAIL") {
          setEmailError("Nevažeća e-mail adresa");
        }
        if (responseMessage == "INVALID_LOGIN_CREDENTIALS") {
          setPasswordError("Neispravna lozinka");
        }
      }

      if (response.ok) {
        const data = await response.json();
        setUserID(data.userId);// neradi????
        setUserToken(data.accessToken);
        localStorage.setItem("userID", data.userId); //temp fix, bad code
        console.log(data.accessToken);
        console.log(data.userId);

        router.replace("/profile");
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className="bg-white p-12 my-8 rounded-lg w-2/5 border-none focus:border-none justify-center items-center"
        style={eventCardStyle}
      >
        <p className="text-black text-center">PRIJAVA</p>
        <p className="text-black text-left my-2">E-mail adresa:</p>
        <input
          type="text"
          name="email"
          className="form-input text-black w-full  mb-6 placeholder-white border-none rounded-lg "
          placeholder="Upišite e-mail"
          style={inputStyle}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {emailError && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{emailError}</span>
          </div>
        )}

        <p className="text-black text-left my-2">Lozinka:</p>
        <input
          type="password"
          name="password"
          className="form-input text-black w-full mb-5 rounded-lg placeholder-white border-none"
          placeholder="Upišite lozinku"
          style={inputStyle}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {passwordError && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{passwordError}</span>
          </div>
        )}
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white mt-10 font-light py-1 px-8 rounded mr-4 rounded-lg "
            style={detailsButtonStyle}
            onClick={handleLogin}
          >
            Prijava
          </button>
        </div>
        <div className=" text-black  mt-4">
          <Link href="/registration">
            <div className="flex flex-row text-center justify-center ">
              <p className="mr-2"> Nemaš profil? </p>
              <p className="text-center text-blue-500 hover:underline">
                Registriraj se
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
