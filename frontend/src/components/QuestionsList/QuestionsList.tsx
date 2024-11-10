import { FaArrowRightLong } from "react-icons/fa6";
import QuestionItem from "../QuestionItem/QuestionItem";
import css from "./QuestionsList.module.css";

export default function QuestionsList() {
  return (
    <>
      <ul className={css.list}>
        <li className={css.item}>
          <QuestionItem>Розкажи про Ar-15</QuestionItem>
        </li>
        <li className={css.item}>
          <QuestionItem>Розкажи про AK-74</QuestionItem>
        </li>
        <li className={css.item}>
          <QuestionItem>
            Перейти до наступної пари
            <FaArrowRightLong className={css.arrow} />
          </QuestionItem>
        </li>
      </ul>
    </>
  );
}
