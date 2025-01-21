import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AppBar from "../../components/AppBar/AppBar";
import WeaponScene from "../../components/WeaponScene/WeaponScene";
import WeaponLabel from "../../components/WeaponLabel/WeaponLabel";
import WeaponSideBar from "../../components/WeaponSideBar/WeaponSidebar";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import { fetchWeaponWithId } from "../../services/weapons";

import { WeaponType } from "../../types/Weapon.types";

import css from "./WeaponPage.module.css";
import ButtonsList from "../../components/ButtonsList/ButtonsList";
import clsx from "clsx";

export default function WeaponPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [weaponData, setWeaponData] = useState<WeaponType>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rotationEnabled, setRotationEnabled] = useState(false);
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
            <WeaponScene
              media={weaponData.media}
              rotationEnabled={rotationEnabled}
            />
            <WeaponLabel weapon={weaponData} />
            <div className={css.sidebarWrapper}>
              <div
                className={clsx(
                  css.sidebar,
                  sidebarOpen ? css.sidebarOpen : css.sidebarClose
                )}
              >
                {weaponData.characteristics && (
                  <WeaponSideBar
                    setSidebarOpen={setSidebarOpen}
                    weaponData={weaponData}
                  />
                )}
              </div>

              <ButtonsList
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                rotationEnabled={rotationEnabled}
                setRotationEnabled={setRotationEnabled}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
