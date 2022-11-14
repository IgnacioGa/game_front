import { configureStore } from "@reduxjs/toolkit";
import { authSlice, roomSlice } from "./";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        room: roomSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})