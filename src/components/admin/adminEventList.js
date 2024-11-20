import React from "react";
import Event from "@/components/event";
import AdminEvent from "@/components/admin/adminEvent";

export default function AdminEventList({
  events,
  onEventDelete,
}) {
  return events.map((event) => (
    <AdminEvent
      key={event.id}
      event={event}
      onEventDelete={onEventDelete}
    />
  ));
}
