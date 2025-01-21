import { WeaponType } from "../../types/Weapon.types";
// import { IoPause, IoPlay } from "react-icons/io5";

import css from "./WeaponTable.module.css";

type Props = {
  weaponData: WeaponType;
};

export default function WeaponTable({ weaponData }: Props) {
  return (
    <>
      <div className={css.container}>
        <table className={css.table}>
          <tbody>
            {weaponData.characteristics.map((char, index) => (
              <tr key={index}>
                <td className={css.cell}>{char.aspect}</td>
                <td className={css.cell}>{char.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
