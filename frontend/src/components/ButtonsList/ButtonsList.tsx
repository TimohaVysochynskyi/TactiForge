import { BsQuestionLg, BsEyeFill } from "react-icons/bs";
import { LuComponent } from "react-icons/lu";
import { TbSettingsAutomation } from "react-icons/tb";

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
          <BsEyeFill className={css.icon} />
        </button>
        <button type="button" className={css.btn}>
          <TbSettingsAutomation className={css.icon} />
        </button>
        <button type="button" className={css.btn}>
          <LuComponent className={css.icon} />
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
