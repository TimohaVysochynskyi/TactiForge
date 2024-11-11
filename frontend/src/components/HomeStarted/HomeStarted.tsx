import { WeaponPairType } from "../../types/Wapon.types";
import WeaponPair from "../WeaponPair/WeaponPair";
import css from "./HomeStarted.module.css";

type Props = {
  weaponsData: WeaponPairType[];
};

export default function HomeStaretd({ weaponsData }: Props) {
  return (
    <>
      <div className={css.container}>
        {weaponsData.map((weaponPair) => (
          <WeaponPair pair={weaponPair} />
        ))}
      </div>
    </>
  );
}
