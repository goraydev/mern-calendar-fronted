import { useSelector, useDispatch } from 'react-redux'
import {
    onDeleteEvent,
    onSetActiveEvent,
    onSetEvents,
    onUpdateEvent
} from '../store/calendar/calendarSlice';

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector(state => state.calendar);

    const dispatch = useDispatch();

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
        deleteEvent
    }
}
