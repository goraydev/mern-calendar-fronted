import { useSelector, useDispatch } from 'react-redux'
import calendarApi from '../api/calendarApi';
import {
    onDeleteEvent,
    onGetEvents,
    onSetActiveEvent,
    onSetEvents,
    onUpdateEvent
} from '../store/calendar/calendarSlice';

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector(state => state.calendar);

    const dispatch = useDispatch();

    const getEvents = async () => {
        try {

            const { data } = await calendarApi.get("/events");
            dispatch(onGetEvents(data.events));

        } catch (error) {
            console.error(error);
        }
    }



    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const setEvents = (calendarEvent) => {

        if (calendarEvent._id) {
            dispatch(onUpdateEvent({ ...calendarEvent }));
        } else {

            dispatch(onSetEvents({ ...calendarEvent, _id: new Date().getTime() }));
        }


    }

    const deleteEvent = () => {

        dispatch(onDeleteEvent());
    }

    return {
        events,
        activeEvent,
        setActiveEvent,
        setEvents,
        deleteEvent,
        getEvents
    }
}
