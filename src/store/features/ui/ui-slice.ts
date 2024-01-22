import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UIState {
    cartIsVisible: boolean;
    notification: {
        status: string;
        title: string;
        message: string;
    } | null;
}

const initialState: UIState = {
    cartIsVisible: false,
    notification: null,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggle(state) {
            state.cartIsVisible = !state.cartIsVisible;
        },
        showNotification(state, action: PayloadAction<{ status: string; title: string; message: string } | null>) {
            action.payload && (
                state.notification = {
                    status: action.payload.status,
                    title: action.payload.title,
                    message: action.payload.message,
                }
            )
        },
    },
});

export const uiActions = uiSlice.actions;

export default uiSlice;