import { FaArrowRightLong } from "react-icons/fa6";
import QuestionItem from "../QuestionItem/QuestionItem";

import { WeaponPairType } from "../../types/Wapon.types";

import css from "./QuestionsList.module.css";

type Props = {
  pair: WeaponPairType;
  onNext: () => void;
  setAudioSrc: (weapon: string) => void;
  audioSrc: string;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
};

export default function QuestionsList({
  pair: { weapons },
  onNext,
  setAudioSrc,
  audioSrc,
  audioRef,
}: Props) {
  return (
    <>
      <audio ref={audioRef} src={`/assets/audio/${audioSrc}.mp3`} />
      <ul className={css.list}>
        {weapons.map((weapon) => (
          <li className={css.item}>
            <QuestionItem
              onClick={() => {
                setAudioSrc(weapon.media);
                if (audioRef.current) {
                  audioRef.current.play();
                }
              }}
            >
              Розкажи про {weapon.name}
            </QuestionItem>
          </li>
        ))}
        <li className={css.item}>
          <QuestionItem onClick={onNext}>
            Перейти до наступної пари
            <FaArrowRightLong className={css.arrow} />
          </QuestionItem>
        </li>
      </ul>
    </>
  );
}
