import React from "react";

export const CalendarEvent = ({ event }) => {
  const { title } = event;

  return (
    <>
      <strong>{title}</strong>
    </>
  );
};
