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
    events: [tempEvent],
    activeEvent: null,

}

export const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },

        onSetEvents: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => {

                if (event._id === payload._id) {
                    return payload;
                }
                return event;
            })
        },
        onDeleteEvent: (state) => {
            state.events = state.events.filter(event => event._id !== state.activeEvent._id);
            state.activeEvent = null;
        }
    }
});

export const {
    onSetActiveEvent,
    onSetEvents,
    onUpdateEvent,
    onDeleteEvent
} = calendarSlice.actions