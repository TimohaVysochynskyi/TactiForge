import { RootState } from "../store";

export const selectAudioSrc = (state: RootState) => state.audio.audioSrc;
export const selectIsPlaying = (state: RootState) => state.audio.isPlaying;
export const selectIsMuted = (state: RootState) => state.audio.isMuted;
