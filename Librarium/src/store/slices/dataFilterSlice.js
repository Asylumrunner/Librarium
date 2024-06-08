import { createSlice } from '@reduxjs/toolkit'

const dataFilterSlice = createSlice({
    name: "dataFilter",
    initialState: {
        searchTerm: "",
        sortMode: "",
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
        },
        setSearchTerm(state, action) {
            state.searchTerm = action.payload
        },
        setSortMode(state, action) {
            state.sortMode = action.payload
        }
    }
});

export const { changeMediaType, setSearchTerm, setSortMode } = dataFilterSlice.actions;
export const dataFilterReducer = dataFilterSlice.reducer;