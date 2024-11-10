import { Link } from "react-router-dom";
import weapon from "/assets/ar15.png";
import css from "./WeaponCard.module.css";

export default function WeaponCard() {
  return (
    <>
      <Link to="/weapons/1" className={css.container}>
        <div className={css.imageWrapper}>
          <img src={weapon} alt="Зображення зброї" className={css.image} />
        </div>

        <div className={css.row}>
          <p className={css.name}>AR-15</p>
          <p className={css.description}>СРСР 1974</p>
        </div>
      </Link>
    </>
  );
}
