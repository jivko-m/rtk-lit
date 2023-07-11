import {createSlice} from "@reduxjs/toolkit";


const myElementSlice = createSlice({
    name: 'myElement',
    initialState: {
        docsHint: 'Click on the Vite and Lit logos to learn more',
        count: 0
    },
    reducers: {
        updateDocsHint(state, action) {
            state.docsHint = action.payload;
        },
        updateCount(state, action) {
            state.count = action.payload;
        }
    }
});

export const { updateDocsHint, updateCount } = myElementSlice.actions;
export default myElementSlice.reducer;
