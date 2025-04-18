import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AudioState {
    audioSrc: string | null;
    isPlaying: boolean;
}

const initialState: AudioState = {
    audioSrc: null,
    isPlaying: false,
};

const audioSlice = createSlice({
    name: "audio",
    initialState,
    reducers: {
        setAudioSrc: (state, action: PayloadAction<string | null>) => {
            state.audioSrc = action.payload;
        },
        setPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        }
    },
});

export const { setAudioSrc, setPlaying } = audioSlice.actions;
export default audioSlice.reducer;
