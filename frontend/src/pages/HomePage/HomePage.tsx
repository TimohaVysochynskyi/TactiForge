import { lazy, useEffect, useState } from "react";
import clsx from "clsx";
import HomeMenu from "../../components/HomeMenu/HomeMenu";
import HomeStaretd from "../../components/HomeStarted/HomeStarted";

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
              <HomeMenu setStarted={() => setStarted(true)} />
            </>
          ) : (
            <HomeStaretd />
          )}
        </div>

        <div className={clsx(css.col, started && css.startedCol)}>
          <SoldierScene chat={started} animation={animation} />
        </div>
      </main>
    </>
  );
}
