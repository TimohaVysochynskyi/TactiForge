import { useDispatch, useSelector } from "react-redux";
import { setAudioSrc, setPlaying, toggleMute } from "../redux/audio/slice";
import { selectAudioSrc, selectIsPlaying, selectIsMuted } from "../redux/audio/selectors";

export const useAudio = () => {
    const dispatch = useDispatch();
    const audioSrc = useSelector(selectAudioSrc);
    const isPlaying = useSelector(selectIsPlaying);
    const isMuted = useSelector(selectIsMuted);

    const playAudio = (src: string) => {
        dispatch(setAudioSrc(src));
        dispatch(setPlaying(true));
    };

    const stopAudio = () => {
        dispatch(setPlaying(false));
    };

    const muteAudio = () => {
        dispatch(toggleMute());
    };

    return { audioSrc, isPlaying, isMuted, playAudio, stopAudio, muteAudio };
};
