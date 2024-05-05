import { createSlice } from '@reduxjs/toolkit'

const dataFilterSlice = createSlice({
    name: "dataFilter",
    initialState: {
        selectedMediaTypes: {
            "book": true,
            "movie": true,
            "video_game": true,
            "board_game": true,
            "rpg": true,
            "anime": true,
            "music": true
        }
    },
    reducers: {
        changeMediaType(state, action) {
            let newState;
            Object.assign(newState, selectedMediaTypes)
            newState[action.payload] = !newState[action.payload]
            state.selectedMediaTypes = newState;
        }
    }
});

export const { changeMediaType } = dataFilterSlice.actions;
export const dataFilterReducer = dataFilterSlice.reducer;