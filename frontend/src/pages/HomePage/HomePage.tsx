import { GrPlayFill } from "react-icons/gr";
import SoldierScene from "../../components/SoldierScene/SoldierScene";

import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <main className={css.container}>
        <SoldierScene />
        <button className={css.startButton} type="button">
          <GrPlayFill className={css.startIcon} />
          Розпочати
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </main>
    </>
  );
}
