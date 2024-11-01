import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Loader from "../Loader/Loader";

//import css from "./App.module.css";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const AboutPage = lazy(() => import("../../pages/AboutPage/AboutPage"));
const HelpPage = lazy(() => import("../../pages/HelpPage/HelpPage"));

export default function App() {
  return (
    <>
      <Suspense fallback={<Loader position="fixed" size="80" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
