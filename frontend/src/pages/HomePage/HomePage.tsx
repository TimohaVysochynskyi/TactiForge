import SoldierScene from "../../components/SoldierScene/SoldierScene";

import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <main className={css.container}>
        <SoldierScene />
      </main>
    </>
  );
}
