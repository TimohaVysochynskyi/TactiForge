import WeaponCard from "../WeaponCard/WeaponCard";
import css from "./WeaponPair.module.css";
import { WeaponPairType } from "../../types/Weapon.types";

type Props = {
  pair: WeaponPairType;
  animatedWeapon: string | null;
};

export default function WeaponPair({ pair, animatedWeapon }: Props) {
  return (
    <>
      <div className={css.container}>
        <h3 className={css.title}>{pair.name}</h3>
        <div className={css.row}>
          {pair.weapons.map((weapon) => (
            <div key={weapon._id} className={css.cardWrapper}>
              <WeaponCard weapon={weapon} animatedWeapon={animatedWeapon} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
