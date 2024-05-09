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
            state.selectedMediaTypes[action.payload] = !state.selectedMediaTypes[action.payload]
        }
    }
});

export const { changeMediaType } = dataFilterSlice.actions;
export const dataFilterReducer = dataFilterSlice.reducer;