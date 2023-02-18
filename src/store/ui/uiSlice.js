import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    modal: false,
}

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        onCloseModal: (state, action) => {
            state.modal = false;
        },
        onOpenModal: (state, action) => {
            state.modal = true;
        },
        onClickModal: (state, action) => {
            state.modal = state.modal ? false : true;
        }

    }
});

export const { onCloseModal, onOpenModal, onClickModal } = uiSlice.actions;