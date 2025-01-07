import { BsQuestionLg, BsEyeFill } from "react-icons/bs";
import { LuComponent } from "react-icons/lu";
import { TbSettingsAutomation } from "react-icons/tb";
import { IoClose } from "react-icons/io5";

import css from "./ButtonsList.module.css";

type Props = {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  rotationEnabled: boolean;
  setRotationEnabled: (values: boolean) => void;
};

export default function ButtonsList({
  modalOpen,
  setModalOpen,
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
          onClick={() => setModalOpen(!modalOpen)}
        >
          {modalOpen ? (
            <IoClose className={css.icon} />
          ) : (
            <BsQuestionLg className={css.icon} />
          )}
        </button>
      </div>
    </>
  );
}
