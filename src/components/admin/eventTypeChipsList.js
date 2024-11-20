import React from "react";
import EventTypeChip from "./eventTypeChip";

export default function EventTypeChipList({ eventTypes, onEventTypeDelete }) {
  return eventTypes.map((eventType) => (
    <EventTypeChip key={eventType.id} eventType={eventType} onEventTypeDelete={onEventTypeDelete}/>
  ));
}
