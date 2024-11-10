import { FaArrowRightLong } from "react-icons/fa6";
import WeaponCard from "../WeaponCard/WeaponCard";
import css from "./WeaponPair.module.css";

export default function WeaponPair() {
  return (
    <>
      <div className={css.container}>
        <h3 className={css.title}>Штурмові гвинтівки</h3>
        <div className={css.row}>
          <WeaponCard />
          <WeaponCard />
        </div>
        <button type="button" className={css.button}>
          Перейти далі
          <FaArrowRightLong className={css.arrow} />
        </button>
      </div>
    </>
  );
}
