import WeaponPair from "../WeaponPair/WeaponPair";
import css from "./HomeStarted.module.css";

export default function HomeStaretd() {
  return (
    <>
      <div className={css.container}>
        <WeaponPair />
        <WeaponPair />
        <WeaponPair />
      </div>
    </>
  );
}
