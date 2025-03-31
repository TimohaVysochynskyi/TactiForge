import { Link } from "react-router-dom";
import { WeaponType } from "../../types/Weapon.types";
import clsx from "clsx";

import css from "./WeaponCard.module.css";

type Props = {
  weapon: WeaponType;
  animatedWeapon: string | null;
};

export default function WeaponCard({
  weapon: { _id, name, country, year, media },
  animatedWeapon,
}: Props) {
  return (
    <>
      <Link
        to={`/weapons/${_id}`}
        className={clsx(
          css.container,
          animatedWeapon == _id && css.animatedImage
        )}
      >
        <div className={css.imageWrapper}>
          <img
            src={`/assets/previews/${media}.png`}
            alt="Зображення зброї"
            className={css.image}
          />
        </div>

        <div className={css.row}>
          <p className={css.name}>{name}</p>
          <p className={css.description}>
            {country} <br /> {year}
          </p>
        </div>
      </Link>
    </>
  );
}
