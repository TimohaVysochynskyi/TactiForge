import { FaArrowRightLong } from "react-icons/fa6";
import { WeaponPairType } from "../../types/Weapon.types";
import css from "./QuestionsList.module.css";
type Props = {
  pair: WeaponPairType;
  onNext: () => void;
  onPlayAudio: (weapon: string) => void;
  setAnimatedWeapon: (id: string) => void;
};

export default function QuestionsList({
  pair: { weapons },
  onNext,
  onPlayAudio,
  setAnimatedWeapon,
}: Props) {
  return (
    <ul className={css.list}>
      {weapons.map((weapon) => (
        <li className={css.item} key={weapon._id}>
          <button
            type="button"
            className={css.button}
            onClick={() => {
              onPlayAudio(weapon.media);
              setAnimatedWeapon(weapon._id);
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
  );
}
