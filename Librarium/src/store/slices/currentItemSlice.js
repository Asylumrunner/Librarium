import { createSlice } from '@reduxjs/toolkit'

const currentItemSlice = createSlice({
    name: "currentItem",
    initialState: {
        selectedItem: null
    },
    reducers: {
        setCurrentItem(state, action) {
            state.selectedItem = action.payload
        },
        removeCurrentItem(state, action) {
            state.selectedItem = null
        }
    }
});

export const { setCurrentItem, removeCurrentItem } = currentItemSlice.actions;
export const currentItemReducer = currentItemSlice.reducer;