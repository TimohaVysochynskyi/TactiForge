import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import WeaponPair from "../WeaponPair/WeaponPair";

import { WeaponPairType } from "../../types/Wapon.types";

import css from "./HomeStarted.module.css";
import { useState } from "react";
import clsx from "clsx";

type Props = {
  weaponsData: WeaponPairType[];
  pair: number;
  onNext: () => void;
  onPrev: () => void;
};

export default function HomeStaretd({
  weaponsData,
  pair,
  onNext,
  onPrev,
}: Props) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      <div className={css.container}>
        <div
          className={clsx(isVisible ? css.showAnimation : css.hideAnimation)}
        >
          <WeaponPair pair={weaponsData[pair]} />
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
        </div>
      </div>
    </>
  );
}
