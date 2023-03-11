import { parseISO } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux'
import calendarApi from '../api/calendarApi';
import { convertEventsToDateEvent } from '../helpers';
import {
    onClearAllCalendar,
    onDeleteEvent,
    onGetEvents,
    onSetActiveEvent,
    onSetEvents,
    onUpdateEvent
} from '../store/calendar/calendarSlice';

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth)

    const dispatch = useDispatch();

    const getEvents = async () => {
        try {


            const { data } = await calendarApi.get("/events");
            const events = convertEventsToDateEvent(data.events);
            dispatch(onGetEvents(events));


        } catch (error) {
            console.error(error);
        }
    }



    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const setEvents = async (calendarEvent) => {

        try {

            if (calendarEvent.id) {

                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;
            }

            //Guardar en la BD
            const { data } = await calendarApi.post("/events", calendarEvent);
            data.msg.start = parseISO(data.msg.start);
            data.msg.end = parseISO(data.msg.end);
            dispatch(onSetEvents({ ...data.msg, id: data.msg.id, user: user }));


        } catch (error) {
            console.error(error);
        }


    }

    const deleteEvent = async () => {

        try {

            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent());
        } catch (error) {
            console.error(error);
        }
    }

    const clearCalendar = () => {
        dispatch(onClearAllCalendar());
    }

    return {
        events,
        activeEvent,

        setActiveEvent,
        setEvents,
        deleteEvent,
        getEvents,
        clearCalendar
    }
}
