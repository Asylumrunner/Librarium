import { createSlice } from '@reduxjs/toolkit'

const currentItemSlice = createSlice({
    name: "currentItem",
    initialState: {
        selectedItem: null,
        inCollection: false
    },
    reducers: {
        setCurrentItem(state, action) {
            var { item, inCollection } = action.payload
            state.selectedItem = item
            state.inCollection = inCollection
        },
        removeCurrentItem(state, action) {
            state.selectedItem = null
            state.inCollection = false
        }
    }
});

export const { setCurrentItem, removeCurrentItem } = currentItemSlice.actions;
export const currentItemReducer = currentItemSlice.reducer;