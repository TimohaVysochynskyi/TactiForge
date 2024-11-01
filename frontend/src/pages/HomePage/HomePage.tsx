import { lazy, useEffect, useState } from "react";
import clsx from "clsx";
import { GrPlayFill } from "react-icons/gr";
import Navigation from "../../components/Navigation/Navigation";
import Socials from "../../components/Socials/Socials";

import css from "./HomePage.module.css";

const SoldierScene = lazy(
  () => import("../../components/SoldierScene/SoldierScene")
);

export default function HomePage() {
  const [started, setStarted] = useState(false);
  const [animation, setAnimation] = useState("Talking1");

  useEffect(() => {
    if (started) {
      setAnimation("Talking3");
    } else {
      setAnimation("Talking1");
    }
  }, [started]);

  return (
    <>
      <main className={clsx(css.container, started && css.startedContainer)}>
        <div className={clsx(css.col, started && css.startedCol)}>
          {!started ? (
            <>
              <Navigation />
              <div className={css.colMiddle}>
                <img
                  src="/assets/logo.svg"
                  alt="Логотип"
                  className={css.logo}
                />
                <h2 className={css.subtitle}>Куємо безпечне майбутнє</h2>
                <button
                  className={css.startButton}
                  onClick={() => setStarted(true)}
                  type="button"
                >
                  <GrPlayFill className={css.startIcon} />
                  Розпочати
                </button>
              </div>
              <Socials />
            </>
          ) : (
            "HI"
          )}
        </div>

        <div className={clsx(css.col, started && css.startedCol)}>
          <SoldierScene chat={started} animation={animation} />
        </div>
      </main>
    </>
  );
}
