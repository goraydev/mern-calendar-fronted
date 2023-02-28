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

    const setEvents = async (calendarEvent) => {

        try {

            if (calendarEvent._id) {
                //actualizar event y guardarlo en la BD
                dispatch(onUpdateEvent({ ...calendarEvent }));
            } else {

                //Guardar en la BD
                const { data } = await calendarApi.post("/events", calendarEvent);
                
                dispatch(onSetEvents({...data}));
                

            }
        } catch (error) {
            console.error(error);
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
