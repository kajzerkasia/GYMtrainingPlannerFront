import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UIState {
    notification: {
        status: string;
        title: string;
        message: string;
    } | null;
}

const initialState: UIState = {
    notification: null,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        showNotification(state, action: PayloadAction<{ status: string; title: string; message: string } | null>) {
            action.payload && (
                state.notification = {
                    status: action.payload.status,
                    title: action.payload.title,
                    message: action.payload.message,
                }
            )
        },
        hideNotification(state) {
            state.notification = null;
        },
    },
});

export const uiActions = uiSlice.actions;

export default uiSlice;