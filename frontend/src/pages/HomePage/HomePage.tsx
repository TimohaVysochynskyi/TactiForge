import { lazy, useEffect, useState } from "react";
import clsx from "clsx";
import HomeMenu from "../../components/HomeMenu/HomeMenu";
import HomeStarted from "../../components/HomeStarted/HomeStarted";

import css from "./HomePage.module.css";
import Chat from "../../components/Chat/Chat";
import { fetchAllWeaponPairs } from "../../services/weapons";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Fog from "../../components/Fog/Fog";

const SoldierScene = lazy(
  () => import("../../components/SoldierScene/SoldierScene")
);

export default function HomePage() {
  // Зчитування станів з localStorage
  const [started, setStarted] = useState(() => {
    const saved = localStorage.getItem("started");
    return saved ? JSON.parse(saved) : false;
  });

  const [pairNumber, setPairNumber] = useState(() => {
    const saved = localStorage.getItem("pairNumber");
    return saved && !isNaN(parseInt(saved, 10)) ? parseInt(saved, 10) : 0;
  });

  const [animation, setAnimation] = useState("Idle");
  const [chatOpen, setChatOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [weaponsData, setWeaponsData] = useState([]);

  // Ефект для збереження стану started у localStorage
  useEffect(() => {
    localStorage.setItem("started", JSON.stringify(started));
  }, [started]);

  // Ефект для збереження стану pairNumber у localStorage
  useEffect(() => {
    localStorage.setItem("pairNumber", pairNumber.toString());
  }, [pairNumber]);

  useEffect(() => {
    if (started) {
      setAnimation("Talking");
    } else {
      setAnimation("Idle");
    }
  }, [started]);

  useEffect(() => {
    async function fetchAllWeapons() {
      try {
        setLoading(true);
        const response = await fetchAllWeaponPairs();
        setWeaponsData(response.data);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllWeapons();
  }, []);

  // Обробники для зміни станів
  const handleStart = () => {
    setStarted(true);
  };

  const handleNext = () => {
    if (pairNumber < weaponsData.length - 1) {
      setPairNumber(pairNumber + 1);
    }
  };

  const handlePrev = () => {
    if (pairNumber > 0) {
      setPairNumber(pairNumber - 1);
    }
  };

  if (loading) return <Loader size="80" position="absolute" />;
  if (error) return <ErrorMessage />;

  return (
    <>
      <Fog />
      <main className={clsx(css.container, started && css.startedContainer)}>
        <div className={clsx(css.col, started && css.startedCol)}>
          {!started ? (
            <HomeMenu setStarted={handleStart} />
          ) : weaponsData.length > 0 ? (
            <HomeStarted
              weaponsData={weaponsData}
              pair={pairNumber}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          ) : (
            <div>Дані відсутні!</div>
          )}
        </div>

        <div className={clsx(css.col, started && css.startedCol)}>
          <SoldierScene chat={started} animation={animation}>
            <Chat
              chatOpen={chatOpen}
              changeChatStatus={() => setChatOpen((prev) => !prev)}
              pair={weaponsData[pairNumber]}
              onNext={handleNext}
            />
          </SoldierScene>
        </div>
      </main>
    </>
  );
}
