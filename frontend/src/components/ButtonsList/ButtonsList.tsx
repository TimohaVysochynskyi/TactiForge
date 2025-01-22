import { BsQuestionLg } from "react-icons/bs";
import { FiRotateCw } from "react-icons/fi";
import { HiArrowsPointingOut, HiArrowsPointingIn } from "react-icons/hi2";

import css from "./ButtonsList.module.css";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  rotationEnabled: boolean;
  setRotationEnabled: (values: boolean) => void;
  currentAnimation: string;
  changeAnimation: () => void;
};

export default function ButtonsList({
  sidebarOpen,
  setSidebarOpen,
  rotationEnabled,
  setRotationEnabled,
  currentAnimation,
  changeAnimation,
}: Props) {
  return (
    <>
      <div className={css.list}>
        <button
          type="button"
          className={css.btn}
          onClick={() => setRotationEnabled(!rotationEnabled)}
        >
          <FiRotateCw className={css.icon} />
        </button>
        {/* <button type="button" className={css.btn}>
          <GiPlayButton className={css.icon} />
        </button> */}
        <button type="button" className={css.btn} onClick={changeAnimation}>
          {currentAnimation == "idle" || currentAnimation == "assemble" ? (
            <>
              <HiArrowsPointingOut className={css.icon} />
            </>
          ) : (
            <HiArrowsPointingIn className={css.icon} />
          )}
        </button>
        <button
          type="button"
          className={css.btn}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <BsQuestionLg className={css.icon} />
        </button>
      </div>
    </>
  );
}
