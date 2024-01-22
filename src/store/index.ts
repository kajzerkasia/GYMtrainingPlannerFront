import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import itemsSlice from "./features/items/items-slice";
import uiSlice from "./features/ui/ui-slice";
import calendarSlice from "./features/calendar/calendar-slice";

const store = configureStore({
    reducer: {
        items: itemsSlice.reducer,
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer,
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;