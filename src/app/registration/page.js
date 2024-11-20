"use client";
import React, { useEffect } from "react";
import { REGISTER_ENDPOINT } from "@/api/endpoints";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { eventCardStyle, inputStyle, detailsButtonStyle } from "../styles";
import InputField from "@/components/inputField";
import { fetchEventTypes } from "@/api/api";

const Register = ({}) => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmation, setEmailConfirmation] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [eventTypes, setEventTypes] = useState([]);
  const [eventTypeIds, seteventTypeIds] = useState([]);

  const [registrationError, setregistrationError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      setIsLoading(true);
      const eventTypeData = await fetchEventTypes();
      setEventTypes(eventTypeData);
      // Initialize eventTypeIds with all event type ids
    } finally {
      setIsLoading(false);
    }
  };

  const checkIfAllFieldsAreFilled = () => {
    return (
      firstName &&
      lastName &&
      email &&
      emailConfirmation &&
      passwordConfirmation &&
      dateOfBirth &&
      city
    );
  };

  const checkRegistrationData = () => {
    if (email != emailConfirmation) {
      setregistrationError("E-mail adrese se ne podudaraju");
      setTimeout(() => {
        setregistrationError("");
      }, 3000);
      return false;
    }
    if (password != passwordConfirmation) {
      setregistrationError("Lozinke se ne podudaraju");
      setTimeout(() => {
        setregistrationError("");
      }, 3000);
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    try {
      if (!checkIfAllFieldsAreFilled()) {
        setregistrationError("Molimo popunite sva polja");
        setTimeout(() => {
          setregistrationError("");
        }, 3000);
        return;
      }
      if (!checkRegistrationData()) {
        return;
      }
      const url = `${REGISTER_ENDPOINT}`;
      const userRegistrationData = JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        dob: new Date(dateOfBirth).toISOString(),
        eventTypeIds,
        city,
      });

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userRegistrationData,
      });
      const responseData = await response.text();
      if (responseData == "EMAIL_EXISTS") {
        setregistrationError("E-mail adresa već postoji");
      }
      if (responseData == "INVALID_EMAIL") {
        setregistrationError("Nevažeća e-mail adresa");
      }
      if (response.ok) {
        const data = await response;
        router.replace("/login");
      } else {
        console.error("Error fetching ", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEventTypeToggle = (eventTypeId) => {
    seteventTypeIds((preveventTypeIds) => {
      if (preveventTypeIds.includes(eventTypeId)) {
        // Remove the event type if it's already selected
        return preveventTypeIds.filter((id) => id !== eventTypeId);
      } else {
        // Add the event type if it's not selected
        return [...preveventTypeIds, eventTypeId];
      }
    });
  };

  return (
    <div className="flex items-center justify-center ">
      <div
        className="bg-white p-12 my-8 rounded-lg w-3/5 border-none focus:border-none "
        style={eventCardStyle}
      >
        <p className="text-black text-center">Registracija</p>

        <div className="flex justify-center">
          <div className="flex-col mr-10">
            <InputField
              name="Ime"
              type={"text"}
              placeholder={"Upišite ime"}
              label={"Ime"}
              onChange={(e) => setfirstName(e.target.value)}
            />
          </div>

          <div className="flex-col ">
            <InputField
              name="Prezime"
              type={"text"}
              placeholder={"Upišite prezime"}
              label={"Prezime"}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <p className="text-black mb-2 text-center">Događaji koje preferiram:</p>

        <div className="flex flex-wrap justify-center mb-4">
          {eventTypes.map((eventType) => (
            <div key={eventType.id} className="mx-4 flex flex-row my-2">
              <input
                type="checkbox"
                id={eventType.id}
                name={eventType.id}
                onChange={() => handleEventTypeToggle(eventType.name)}
                className="form-checkbox text-black mt-3"
              />
              <label
                htmlFor={eventType.id}
                className="ml-2 mr-6 text-black rounded-lg p-2"
                style={inputStyle}
              >
                {eventType.name}
              </label>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <div className="flex-col mr-10">
            <InputField
              name="email"
              type={"text"}
              placeholder={"Upišite e-mail"}
              label={"E-mail adresa"}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex-col">
            <InputField
              name="email"
              type={"text"}
              placeholder={"Potvrdite e-mail"}
              label={"Potvrdite e-mail adresu"}
              onChange={(e) => setEmailConfirmation(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex-col mr-10">
            <InputField
              name="Password"
              type={"password"}
              placeholder={"Upišite lozinku"}
              label={"Lozinka"}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex-col">
            <InputField
              name="Password"
              type={"password"}
              placeholder={"Potvrdite lozinku"}
              label={"Potvrdite lozinku"}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex-col mr-10 w-1/5">
            <InputField
              name="city"
              type={"text"}
              placeholder={"Upišite grad"}
              label={"Grad"}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="flex-col">
            <p className="text-black text-left my-2 text-center">
              Datum rođenja:
            </p>

            <div className="flex justify-center items center ">
              <input
                type="date"
                name="email"
                className="form-input text-black w-full  mb-6  placeholder-white border-none rounded-lg "
                placeholder="Mjesec"
                style={inputStyle}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          {registrationError && (
            <div
              className="p-4 mb-4 text-md text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 w-2/5"
              role="alert"
            >
              <span className="font-medium">{registrationError}</span>
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white  font-light py-1 px-8 rounded rounded-lg "
            style={detailsButtonStyle}
            onClick={handleRegister}
          >
            Registracija
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
