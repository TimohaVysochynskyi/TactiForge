import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AppBar from "../../components/AppBar/AppBar";
import WeaponScene from "../../components/WeaponScene/WeaponScene";
import WeaponLabel from "../../components/WeaponLabel/WeaponLabel";
import WeaponModal from "../../components/WeaponModal/WeaponModal";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { BsQuestionLg } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

import { fetchWeaponWithId } from "../../services/weapons";

import { WeaponType } from "../../types/Wapon.types";

import css from "./WeaponPage.module.css";

export default function WeaponPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [weaponData, setWeaponData] = useState<WeaponType>();
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams<string>();

  useEffect(() => {
    async function fetchWeapon() {
      try {
        setLoading(true);
        if (id) {
          const response = await fetchWeaponWithId(id);
          setWeaponData(response.data);
        }
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchWeapon();
  }, []);

  if (!id) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className={css.container}>
        <AppBar />
        {loading && <Loader position="absolute" size="80" />}
        {error && <ErrorMessage />}
        {weaponData && (
          <>
            <WeaponScene media={weaponData.media} />
            <WeaponLabel weapon={weaponData} />
            <div className={css.modalWrapper}>
              {modalOpen && (
                <div className={css.modal}>
                  <WeaponModal />
                </div>
              )}

              <button
                type="button"
                className={css.modalBtn}
                onClick={() => setModalOpen(!modalOpen)}
              >
                {modalOpen ? (
                  <IoClose className={css.modalIcon} />
                ) : (
                  <BsQuestionLg className={css.modalIcon} />
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
