import { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer } from "../../helpers";
import { NavBar, CalendarEvent, CalendarModal, FabAddNew } from "../";
import { useUiStore, useCalendarStore } from "../../hooks";

export const CalendarPage = () => {
  const { openOrCloseModal } = useUiStore();
  const { events, setActiveEvent, getEvents } = useCalendarStore();

  useEffect(() => {
    getEvents();
  }, [events]);

  const [viewCalendar, setViewCalendar] = useState(
    localStorage.getItem("viewCalendar") || "month"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#10B981",
      color: "272D2D",
    };

    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    openOrCloseModal();
  };

  const onSelectNote = (event) => {
    console.log("select", { event });
    setActiveEvent(event);
  };

  const onViewChange = (event) => {
    localStorage.setItem("viewCalendar", event);
  };

  return (
    <>
      <NavBar />
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={viewCalendar}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectNote}
        onView={onViewChange}
      />
      <FabAddNew />
      <CalendarModal />
    </>
  );
};
