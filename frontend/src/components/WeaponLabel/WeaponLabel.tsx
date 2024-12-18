import { WeaponType } from "../../types/Wapon.types";
import css from "./WeaponLabel.module.css";

type Props = {
  weapon: WeaponType;
};

export default function WeaponLabel({
  weapon: { name, year, country },
}: Props) {
  return (
    <>
      <div className={css.container}>
        <h2 className={css.title}>{name}</h2>
        <div className={css.description}>
          <p className={css.text}>{year}</p>
          <p className={css.text}>{country}</p>
        </div>
      </div>
    </>
  );
}
