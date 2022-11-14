import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
    name: 'auth',
    initialState: {
        room_id : undefined,
        type: undefined
    },
    reducers: {
        onCreate: (state, {payload}) => {
            state.room_id = payload.room_id
            state.type = payload.type
        }
    }
});

export const {onCreate} = roomSlice.actions