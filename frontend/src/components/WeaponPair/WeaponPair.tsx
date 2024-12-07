import { FaArrowRightLong } from "react-icons/fa6";
import WeaponCard from "../WeaponCard/WeaponCard";
import css from "./WeaponPair.module.css";
import { WeaponPairType } from "../../types/Wapon.types";

type Props = {
  pair: WeaponPairType;
  onNext: () => void;
};

export default function WeaponPair({ pair, onNext }: Props) {
  return (
    <>
      <div className={css.container}>
        <h3 className={css.title}>{pair.name}</h3>
        <div className={css.row}>
          {pair.weapons.map((weapon) => (
            <WeaponCard weapon={weapon} />
          ))}
        </div>
        <button type="button" onClick={onNext} className={css.button}>
          Перейти далі
          <FaArrowRightLong className={css.arrow} />
        </button>
      </div>
    </>
  );
}
