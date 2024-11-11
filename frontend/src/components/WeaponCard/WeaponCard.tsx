import { Link } from "react-router-dom";
import { WeaponType } from "../../types/Wapon.types";

import css from "./WeaponCard.module.css";

type Props = {
  weapon: WeaponType;
};

export default function WeaponCard({
  weapon: { name, country, year, media },
}: Props) {
  return (
    <>
      <Link to={`/weapons/${media}`} className={css.container}>
        <div className={css.imageWrapper}>
          <img
            src={`/assets/${media}.png`}
            alt="Зображення зброї"
            className={css.image}
          />
        </div>

        <div className={css.row}>
          <p className={css.name}>{name}</p>
          <p className={css.description}>
            {country} {year}
          </p>
        </div>
      </Link>
    </>
  );
}
