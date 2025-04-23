import { lazy, useEffect, useState } from "react";
import HomeWrapper from "../../components/HomeWrapper/HomeWrapper";

import css from "./LaboratoryPage.module.css";
import Chat from "../../components/Chat/Chat";
import { fetchAllWeaponPairs } from "../../services/weapons";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import AppBar from "../../components/AppBar/AppBar";
// import Fog from "../../components/Fog/Fog";

const SoldierScene = lazy(
  () => import("../../components/SoldierScene/SoldierScene")
);

export default function LaboratoryPage() {
  // Зчитування станів з localStorage

  const [pairNumber, setPairNumber] = useState(() => {
    const saved = localStorage.getItem("pairNumber");
    return saved && !isNaN(parseInt(saved, 10)) ? parseInt(saved, 10) : 0;
  });

  const [animation, setAnimation] = useState("Idle");
  const [chatOpen, setChatOpen] = useState(false);
  const [animatedWeapon, setAnimatedWeapon] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [weaponsData, setWeaponsData] = useState([]);

  // Ефект для збереження стану pairNumber у localStorage
  useEffect(() => {
    localStorage.setItem("pairNumber", pairNumber.toString());
  }, [pairNumber]);

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

  const handleTalkingAnimation = (value: boolean) => {
    if (value) {
      setAnimation("Talking");
    } else {
      setAnimation("Idle");
    }
  };

  if (loading) return <CustomLoader />;
  if (error) return <ErrorMessage />;

  return (
    <>
      {/* <Fog /> */}
      <AppBar />
      <main className={css.container}>
        <div className={css.col}>
          {weaponsData.length > 0 && (
            <HomeWrapper
              weaponsData={weaponsData}
              pair={pairNumber}
              onNext={handleNext}
              onPrev={handlePrev}
              setPair={setPairNumber}
              animatedWeapon={animatedWeapon}
            />
          )}
        </div>

        <div className={css.col}>
          <SoldierScene animation={animation}>
            <Chat
              chatOpen={chatOpen}
              changeChatStatus={() => setChatOpen((prev) => !prev)}
              pair={weaponsData[pairNumber]}
              onNext={handleNext}
              onAudio={handleTalkingAnimation}
              setAnimatedWeapon={setAnimatedWeapon}
            />
          </SoldierScene>
        </div>
      </main>
    </>
  );
}
