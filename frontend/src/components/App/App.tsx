import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Loader from "../Loader/Loader";

//import css from "./App.module.css";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));

export default function App() {
  return (
    <>
      <Suspense fallback={<Loader size="80" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </>
  );
}
