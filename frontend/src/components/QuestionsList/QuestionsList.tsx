import { FaArrowRightLong } from "react-icons/fa6";

import { WeaponPairType } from "../../types/Wapon.types";

import css from "./QuestionsList.module.css";

type Props = {
  pair: WeaponPairType;
  onNext: () => void;
  setAudio: (weapon: string) => void;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
};

export default function QuestionsList({
  pair: { weapons },
  onNext,
  setAudio,
  audioRef,
}: Props) {
  return (
    <>
      <ul className={css.list}>
        {weapons.map((weapon) => (
          <li className={css.item}>
            <button
              type="button"
              className={css.button}
              onClick={() => {
                setAudio(weapon.media);
                if (audioRef.current) {
                  audioRef.current.play();
                }
              }}
            >
              Розкажи про {weapon.name}
            </button>
          </li>
        ))}
        <li className={css.item}>
          <button type="button" className={css.button} onClick={onNext}>
            Перейти до наступної пари
            <FaArrowRightLong className={css.arrow} />
          </button>
        </li>
      </ul>
    </>
  );
}
