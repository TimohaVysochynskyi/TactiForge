import clsx from "clsx";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import QuestionsList from "../QuestionsList/QuestionsList";

import { WeaponPairType } from "../../types/Wapon.types";

import css from "./Chat.module.css";

type Props = {
  chatOpen: boolean;
  changeChatStatus: () => void;
  pair: WeaponPairType;
  onNext: () => void;
};
export default function Chat({
  chatOpen,
  changeChatStatus,
  pair,
  onNext,
}: Props) {
  return (
    <>
      <div className={clsx(css.chat, chatOpen && css.chatOpened)}>
        <button type="button" className={css.button} onClick={changeChatStatus}>
          {chatOpen ? (
            <>
              закрити меню <IoIosArrowDown className={css.arrow} />
            </>
          ) : (
            <>
              вибрати питання
              <IoIosArrowUp className={css.arrow} />
            </>
          )}
        </button>
        {chatOpen && (
          <>
            <QuestionsList pair={pair} onNext={onNext} />
          </>
        )}
      </div>
    </>
  );
}
