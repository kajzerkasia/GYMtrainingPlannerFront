import {configureStore} from "@reduxjs/toolkit";
import itemsSlice from "./items-slice";

const store = configureStore({
    reducer: {
        items: itemsSlice.reducer,
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;