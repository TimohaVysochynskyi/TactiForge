import { FaArrowRightLong } from "react-icons/fa6";
import QuestionItem from "../QuestionItem/QuestionItem";

import { WeaponPairType } from "../../types/Wapon.types";

import css from "./QuestionsList.module.css";

type Props = {
  pair: WeaponPairType;
  onNext: () => void;
};

export default function QuestionsList({ pair: { weapons }, onNext }: Props) {
  return (
    <>
      <ul className={css.list}>
        {weapons.map((weapon) => (
          <li className={css.item}>
            <QuestionItem
              onClick={() => {
                alert(weapon.shortText);
              }}
            >
              Розкажи про {weapon.name}
            </QuestionItem>
          </li>
        ))}
        <li className={css.item}>
          <QuestionItem onClick={onNext}>
            Перейти до наступної пари
            <FaArrowRightLong className={css.arrow} />
          </QuestionItem>
        </li>
      </ul>
    </>
  );
}
