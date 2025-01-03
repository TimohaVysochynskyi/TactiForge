import { useRef, useState } from "react";

import clsx from "clsx";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoPause, IoPlay, IoReload } from "react-icons/io5";

import QuestionsList from "../QuestionsList/QuestionsList";

import { WeaponPairType } from "../../types/Wapon.types";

import css from "./Chat.module.css";

type Props = {
  chatOpen: boolean;
  changeChatStatus: () => void;
  pair: WeaponPairType;
  onNext: () => void;
};
export default function Chat({
  chatOpen,
  changeChatStatus,
  pair,
  onNext,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [audioPlaying, setAudioPlaying] = useState<boolean>();
  const [audioProgress, setAudioProgress] = useState(0);

  const handleLoadAudio = (weapon: string) => {
    setAudioSrc(weapon);
    if (audioRef.current) {
      setAudioPlaying(true);
      audioRef.current.play();
    }
  };

  const toggleAudioPlay = () => {
    if (!audioRef.current) return;

    if (audioPlaying) audioRef.current.pause();
    else audioRef.current.play();

    setAudioPlaying(!audioPlaying);
  };

  const handleRestartAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setAudioProgress(0);

    if (!audioPlaying) {
      audioRef.current.play();
      setAudioPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration || 1; // Avoid division by zero
    setAudioProgress((currentTime / duration) * 100);
  };

  return (
    <>
      {audioSrc !== null && (
        <div className={css.audioWrapper}>
          <button className={css.audioBtn} onClick={handleRestartAudio}>
            <IoReload className={css.audioIcon} />
          </button>
          <div className={css.progressWrapper}>
            <div
              className={css.progress}
              style={{ width: `${audioProgress}%` }}
            ></div>
          </div>
          <button className={css.audioBtn} onClick={toggleAudioPlay}>
            {audioPlaying ? (
              <IoPause className={css.audioIcon} />
            ) : (
              <IoPlay className={css.audioIcon} />
            )}
          </button>
          <audio
            ref={audioRef}
            src={`/assets/audio/${audioSrc}.mp3`}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setAudioPlaying(false)}
          />
        </div>
      )}
      <div className={clsx(css.chat, chatOpen && css.chatOpened)}>
        <button type="button" className={css.button} onClick={changeChatStatus}>
          {chatOpen ? (
            <>
              закрити меню <IoIosArrowDown className={css.arrow} />
            </>
          ) : (
            <>
              вибрати питання
              <IoIosArrowUp className={css.arrow} />
            </>
          )}
        </button>
        {chatOpen && (
          <>
            <QuestionsList
              pair={pair}
              onNext={onNext}
              playAudio={handleLoadAudio}
            />
          </>
        )}
      </div>
    </>
  );
}
