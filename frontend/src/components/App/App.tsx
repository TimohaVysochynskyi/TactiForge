import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Loader from "../Loader/Loader";
import Layout from "../Layout/Layout";

//import css from "./App.module.css";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));

export default function App() {
  return (
    <>
      <Layout>
        <Suspense fallback={<Loader size="80" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}
