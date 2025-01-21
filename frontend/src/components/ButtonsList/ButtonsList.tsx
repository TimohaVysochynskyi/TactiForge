import { BsQuestionLg } from "react-icons/bs";
import { FiRotateCw } from "react-icons/fi";
import { HiArrowsPointingOut } from "react-icons/hi2";

import css from "./ButtonsList.module.css";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  rotationEnabled: boolean;
  setRotationEnabled: (values: boolean) => void;
};

export default function ButtonsList({
  sidebarOpen,
  setSidebarOpen,
  rotationEnabled,
  setRotationEnabled,
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
        <button type="button" className={css.btn}>
          <HiArrowsPointingOut className={css.icon} />
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
