import {configureStore} from "@reduxjs/toolkit";
import itemsSlice from "./features/items/items-slice";
import uiSlice from "./features/ui/ui-slice";

const store = configureStore({
    reducer: {
        items: itemsSlice.reducer,
        ui: uiSlice.reducer,
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;