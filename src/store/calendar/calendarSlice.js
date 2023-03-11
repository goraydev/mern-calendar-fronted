import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns';

const tempEvent = {
    _id: new Date().getTime(),
    title: "Viaje a de Huaraz a Barranca",
    notes: "Hay que presupuestar",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#10B981",
    user: {
        _id: "123",
        name: "Gerson",
    },
}

const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,

}

export const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {

        onGetEvents: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            payload.forEach(event => {
                const exists = state.events.some(dbEvent => dbEvent.id === event.id);
                if (!exists) {
                    state.events.push(event);
                }
            });
        },
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },

        onSetEvents: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => {

                if (event.id === payload.id) {
                    return payload;
                }
                return event;
            })
        },
        onDeleteEvent: (state) => {
            state.events = state.events.filter(event => event.id !== state.activeEvent.id);
            state.activeEvent = null;
        },

        onClearAllCalendar: (state, { payload }) => {
            state.events = [];
            state.activeEvent = null;
            state.isLoadingEvents = true;
        }
    }
});

export const {
    onGetEvents,
    onSetActiveEvent,
    onSetEvents,
    onUpdateEvent,
    onDeleteEvent,
    onClearAllCalendar
} = calendarSlice.actions