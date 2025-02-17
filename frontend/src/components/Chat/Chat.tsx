import { useRef } from "react";
import clsx from "clsx";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  IoPause,
  IoPlay,
  IoReload,
  IoVolumeMedium,
  IoVolumeMute,
} from "react-icons/io5";

import QuestionsList from "../QuestionsList/QuestionsList";
import { WeaponPairType } from "../../types/Weapon.types";
import { useAudio } from "../../hooks/useAudio";

import css from "./Chat.module.css";

type Props = {
  chatOpen: boolean;
  changeChatStatus: () => void;
  pair: WeaponPairType;
  onNext: () => void;
  onAudio: (value: boolean) => void;
  setAnimatedWeapon: (id: string) => void;
};

export default function Chat({
  chatOpen,
  changeChatStatus,
  pair,
  onNext,
  onAudio,
  setAnimatedWeapon,
}: Props) {
  const { audioSrc, isPlaying, isMuted, playAudio, stopAudio, muteAudio } =
    useAudio();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleLoadAudio = async (weapon: string) => {
    await playAudio(weapon);
    onAudio(true);

    if (audioRef.current) {
      audioRef.current.load(); // Перезапускаємо завантаження
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error("Автоматичне відтворення заблоковане:", error);
      }
    }
  };

  const toggleAudioPlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      stopAudio();
      audioRef.current.pause();
      onAudio(false);
    } else if (audioSrc) {
      await playAudio(audioSrc);
      try {
        await audioRef.current.play();
        onAudio(true);
      } catch (error) {
        console.error("Не вдалося відтворити аудіо:", error);
      }
    }
  };

  return (
    <>
      {audioSrc && (
        <>
          <audio
            ref={audioRef}
            src={`/assets/audio/${audioSrc}.mp3`}
            onEnded={() => onAudio(false)}
          />
          <div className={css.audioWrapper}>
            <button
              className={css.audioBtn}
              onClick={() => playAudio(audioSrc)}
            >
              <IoReload className={css.audioIcon} />
            </button>
            <div className={css.audioGroup}>
              <button className={css.audioBtn} onClick={muteAudio}>
                {isMuted ? (
                  <IoVolumeMute className={css.audioIcon} />
                ) : (
                  <IoVolumeMedium className={css.audioIcon} />
                )}
              </button>
              <button className={css.audioBtn} onClick={toggleAudioPlay}>
                {isPlaying ? (
                  <IoPause className={css.audioIcon} />
                ) : (
                  <IoPlay className={css.audioIcon} />
                )}
              </button>
            </div>
          </div>
        </>
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
          <QuestionsList
            pair={pair}
            onNext={onNext}
            onPlayAudio={handleLoadAudio}
            setAnimatedWeapon={setAnimatedWeapon}
          />
        )}
      </div>
    </>
  );
}
