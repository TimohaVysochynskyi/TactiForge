import { lazy, useEffect, useState } from "react";
import clsx from "clsx";
import HomeMenu from "../../components/HomeMenu/HomeMenu";
import HomeStarted from "../../components/HomeStarted/HomeStarted";

import css from "./HomePage.module.css";
import Chat from "../../components/Chat/Chat";
import { fetchAllWeaponPairs } from "../../services/weapons";

const SoldierScene = lazy(
  () => import("../../components/SoldierScene/SoldierScene")
);

export default function HomePage() {
  const [started, setStarted] = useState(false);
  const [animation, setAnimation] = useState("Idle");
  const [chatOpen, setChatOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [weaponsData, setWeaponsData] = useState([]);
  const [pairNumber, setPairNumber] = useState(0);

  useEffect(() => {
    if (started) {
      setAnimation("Talking");
    } else {
      setAnimation("Idle");
    }
  }, [started]);
  useEffect(() => {
    setAnimation("Idle");
  }, []);

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

  const handleChatStatus = () => {
    if (chatOpen) setChatOpen(false);
    else setChatOpen(true);
  };

  const handleNext = () => {
    setPairNumber(pairNumber + 1);
  };

  return (
    <>
      <main className={clsx(css.container, started && css.startedContainer)}>
        <div className={clsx(css.col, started && css.startedCol)}>
          {!started ? (
            <>
              <HomeMenu setStarted={() => setStarted(true)} />
            </>
          ) : (
            <HomeStarted
              weaponsData={weaponsData}
              pair={pairNumber}
              onNext={handleNext}
            />
          )}
        </div>

        <div className={clsx(css.col, started && css.startedCol)}>
          <SoldierScene chat={started} animation={animation}>
            <Chat
              chatOpen={chatOpen}
              changeChatStatus={handleChatStatus}
              pair={weaponsData[pairNumber]}
              onNext={handleNext}
            />
          </SoldierScene>
        </div>
      </main>
    </>
  );
}
