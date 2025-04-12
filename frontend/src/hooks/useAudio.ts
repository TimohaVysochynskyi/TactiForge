import { useDispatch, useSelector } from "react-redux";
import { setAudioSrc, setPlaying } from "../redux/audio/slice";
import { selectAudioSrc, selectIsPlaying } from "../redux/audio/selectors";

export const useAudio = () => {
    const dispatch = useDispatch();
    const audioSrc = useSelector(selectAudioSrc);
    const isPlaying = useSelector(selectIsPlaying);

    const playAudio = (src: string) => {
        dispatch(setAudioSrc(src));
        dispatch(setPlaying(true));
    };

    const stopAudio = () => {
        dispatch(setPlaying(false));
    };

    return { audioSrc, isPlaying, playAudio, stopAudio };
};
