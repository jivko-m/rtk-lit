import {createSelector, createSlice} from "@reduxjs/toolkit";

const requestStatusSlice = createSlice({
    name: 'requestStatus',
    initialState: {
        isPending: false,
        error: null
    },
    reducers: {
        setPending(state, action) {
            state.isPending = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        }
    }
});

export const selectRequestStatus = createSelector([
    (state) => state.requestStatus
], (requestStatus) => requestStatus);


export const { setPending, setError } = requestStatusSlice.actions;
export default requestStatusSlice.reducer;

