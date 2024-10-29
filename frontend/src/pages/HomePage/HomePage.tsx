import { GrPlayFill } from "react-icons/gr";
import SoldierScene from "../../components/SoldierScene/SoldierScene";
import Navigation from "../../components/Navigation/Navigation";
import Socials from "../../components/Socials/Socials";

import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <main className={css.container}>
        <div className={css.col}>
          <Navigation />
          <div className={css.colMiddle}>
            <img src="/assets/logo.svg" alt="Логотип" className={css.logo} />
            <h2 className={css.subtitle}>Куємо безпечне майбутнє</h2>
            <button className={css.startButton} type="button">
              <GrPlayFill className={css.startIcon} />
              Розпочати
            </button>
          </div>
          <Socials />
        </div>

        <div className={css.col}>
          <SoldierScene />
        </div>
      </main>
    </>
  );
}
