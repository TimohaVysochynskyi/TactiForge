import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Loader from "../Loader/Loader";
import BackgroundNoise from "../BackgroundNoise/BackgroundNoise";

//import css from "./App.module.css";

const LandingPage = lazy(() => import("../../pages/LandingPage/LandingPage"));
const LaboratoryPage = lazy(
  () => import("../../pages/LaboratoryPage/LaboratoryPage")
);
const HelpPage = lazy(() => import("../../pages/HelpPage/HelpPage"));
const WeaponPage = lazy(() => import("../../pages/WeaponPage/WeaponPage"));
const AdminPage = lazy(() => import("../../pages/AdminPage/AdminPage"));

export default function App() {
  return (
    <>
      <BackgroundNoise />
      <Suspense fallback={<Loader position="fixed" size="80" />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/laboratory" element={<LaboratoryPage />} />
          <Route path="/weapons/:id" element={<WeaponPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/admin/" element={<AdminPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
