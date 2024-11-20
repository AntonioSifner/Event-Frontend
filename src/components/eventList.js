import React from "react";
import Event from "@/components/event";

export default function EventList({ events, userPreferences }) {
  return events.map((event) => (
    <Event key={event.id} event={event} userPreferences={userPreferences} />
  ));
}
