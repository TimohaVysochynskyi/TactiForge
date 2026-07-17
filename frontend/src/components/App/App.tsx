import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Loader from "../Loader/Loader";
import BackgroundNoise from "../BackgroundNoise/BackgroundNoise";

//import css from "./App.module.css";

const LandingPage = lazy(() => import("../../pages/LandingPage/LandingPage"));
const LaboratoryPage = lazy(
  () => import("../../pages/LaboratoryPage/LaboratoryPage")
);
const WeaponPage = lazy(() => import("../../pages/WeaponPage/WeaponPage"));

export default function App() {
  return (
    <>
      <BackgroundNoise />
      <Suspense fallback={<Loader position="fixed" size="80" />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/laboratory" element={<LaboratoryPage />} />
          <Route path="/weapons/:id" element={<WeaponPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
