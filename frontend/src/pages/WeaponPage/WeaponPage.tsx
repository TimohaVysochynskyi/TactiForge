import AppBar from "../../components/AppBar/AppBar";
import WeaponScene from "../../components/WeaponScene/WeaponScene";
import css from "./WeaponPage.module.css";

export default function WeaponPage() {
  return (
    <>
      <div className={css.container}>
        <AppBar />
        <WeaponScene />
      </div>
    </>
  );
}
