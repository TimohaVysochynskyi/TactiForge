import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AudioState {
    audioSrc: string | null;
    isPlaying: boolean;
    isMuted: boolean;
}

const initialState: AudioState = {
    audioSrc: null,
    isPlaying: false,
    isMuted: false,
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
        },
        toggleMute: (state) => {
            state.isMuted = !state.isMuted;
        },
    },
});

export const { setAudioSrc, setPlaying, toggleMute } = audioSlice.actions;
export default audioSlice.reducer;
