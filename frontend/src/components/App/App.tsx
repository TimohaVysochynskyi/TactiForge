import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Loader from "../Loader/Loader";

//import css from "./App.module.css";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const AboutPage = lazy(() => import("../../pages/AboutPage/AboutPage"));
const HelpPage = lazy(() => import("../../pages/HelpPage/HelpPage"));
const WeaponPage = lazy(() => import("../../pages/WeaponPage/WeaponPage"));

export default function App() {
  return (
    <>
      <Suspense fallback={<Loader position="fixed" size="80" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/weapons/:weaponId" element={<WeaponPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
