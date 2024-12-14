import { Navigate, useParams } from "react-router-dom";
import AppBar from "../../components/AppBar/AppBar";
import WeaponScene from "../../components/WeaponScene/WeaponScene";
import WeaponLabel from "../../components/WeaponLabel/WeaponLabel";

import { BsQuestionCircleFill } from "react-icons/bs";

import css from "./WeaponPage.module.css";
import WeaponModal from "../../components/WeaponModal/WeaponModal";

export default function WeaponPage() {
  const { media } = useParams<string>();
  if (!media) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className={css.container}>
        <AppBar />
        <WeaponScene media={media} />
        <WeaponLabel />
        <div className={css.modalWrapper}>
          <div className={css.modal}>
            <WeaponModal />
          </div>

          <button type="button" className={css.modalBtn}>
            <BsQuestionCircleFill className={css.modalIcon} />
          </button>
        </div>
      </div>
    </>
  );
}
