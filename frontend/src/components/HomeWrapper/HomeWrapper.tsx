import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { IoIosReturnLeft } from "react-icons/io";
import WeaponPair from "../WeaponPair/WeaponPair";

import { WeaponPairType } from "../../types/Weapon.types";

import css from "./HomeWrapper.module.css";
import { useState } from "react";
import clsx from "clsx";

type Props = {
  weaponsData: WeaponPairType[];
  pair: number;
  onNext: () => void;
  onPrev: () => void;
  setPair: (value: number) => void;
  animatedWeapon: string | null;
};

export default function HomeStaretd({
  weaponsData,
  pair,
  onNext,
  onPrev,
  setPair,
  animatedWeapon,
}: Props) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      <div className={css.container}>
        <div
          className={clsx(isVisible ? css.showAnimation : css.hideAnimation)}
        >
          <WeaponPair
            pair={weaponsData[pair]}
            animatedWeapon={animatedWeapon}
          />
        </div>
        <div className={css.btnWrapper}>
          {pair > 0 && (
            <button
              type="button"
              onClick={() => {
                setIsVisible((prev) => !prev);
                setTimeout(() => {
                  onPrev();
                  setIsVisible((prev) => !prev);
                }, 500);
              }}
              className={css.button}
            >
              <FaArrowLeftLong className={css.arrow} />
              Назад
            </button>
          )}
          {pair < weaponsData.length - 1 && (
            <button
              type="button"
              onClick={() => {
                setIsVisible((prev) => !prev);
                setTimeout(() => {
                  onNext();
                  setIsVisible((prev) => !prev);
                }, 500);
              }}
              className={css.button}
            >
              Перейти далі
              <FaArrowRightLong className={css.arrow} />
            </button>
          )}
          {pair >= 3 && (
            <button
              type="button"
              onClick={() => {
                setIsVisible((prev) => !prev);
                setTimeout(() => {
                  setPair(0);
                  setIsVisible((prev) => !prev);
                }, 500);
              }}
              className={css.button}
            >
              Повернутися
              <IoIosReturnLeft className={css.arrow} />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
