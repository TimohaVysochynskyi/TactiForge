import { BsQuestionLg } from "react-icons/bs";
import { LuComponent } from "react-icons/lu";
import { TbView360Arrow } from "react-icons/tb";
import { CgClose } from "react-icons/cg";

import css from "./ButtonsList.module.css";
import clsx from "clsx";

type Props = {
  currentWeapon: string;
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  rotationEnabled: boolean;
  setRotationEnabled: (values: boolean) => void;
  currentAnimation: string;
  changeAnimation: () => void;
};

export default function ButtonsList({
  currentWeapon,
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
          <p className={css.text}>Обертання</p>
          {rotationEnabled ? (
            <>
              <CgClose className={css.icon} />
            </>
          ) : (
            <TbView360Arrow className={css.icon} />
          )}
        </button>
        {/* <button type="button" className={css.btn}>
          <GiPlayButton className={css.icon} />
        </button> */}
        <button
          type="button"
          className={clsx(css.btn, currentWeapon !== "ak74" && css.grayBtn)}
          onClick={changeAnimation}
        >
          <p className={css.text}>Розбірка</p>
          {currentAnimation == "idle" || currentAnimation == "assemble" ? (
            <>
              <LuComponent className={css.icon} />
            </>
          ) : (
            <CgClose className={css.icon} />
          )}
        </button>
        <button
          type="button"
          className={css.btn}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <p className={css.text}>Теорія</p>
          <BsQuestionLg className={css.icon} />
        </button>
      </div>
    </>
  );
}
