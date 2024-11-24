import { WeaponPairType } from "../../types/Wapon.types";
import WeaponPair from "../WeaponPair/WeaponPair";
import css from "./HomeStarted.module.css";

type Props = {
  weaponsData: WeaponPairType[];
  pair: number;
  onNext: () => void;
};

export default function HomeStaretd({ weaponsData, pair, onNext }: Props) {
  return (
    <>
      <div className={css.container}>
        <WeaponPair pair={weaponsData[pair]} onNext={onNext} />
      </div>
    </>
  );
}
