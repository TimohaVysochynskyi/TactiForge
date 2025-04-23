import WeaponTable from "../WeaponTable/WeaponTable";
import { LuArrowLeftToLine } from "react-icons/lu";
import { WeaponType } from "../../types/Weapon.types";

import css from "./WeaponSidebar.module.css";

type Props = {
  setSidebarOpen: (value: boolean) => void;
  weaponData: WeaponType;
};

export default function WeaponSidebar({ setSidebarOpen, weaponData }: Props) {
  return (
    <>
      <div className={css.container}>
        <button className={css.closeBtn} onClick={() => setSidebarOpen(false)}>
          <LuArrowLeftToLine className={css.closeIcon} />
        </button>
        <div className={css.content}>
          <div className={css.section}>
            <h3 className={css.title}>Тактико-технічні характеристики</h3>
            <WeaponTable weaponData={weaponData} />
          </div>
          <div className={css.section}>
            <h3 className={css.title}>Принцип роботи</h3>
            <p className={css.text}>{weaponData.operation}</p>
          </div>
          <br />
          <div className={css.section}>
            <div className={css.sourcesList}>
              {weaponData.sources.map((source, index) => (
                <a key={index} href={source} className={css.sourceLink}>
                  Джерело {index + 1}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
