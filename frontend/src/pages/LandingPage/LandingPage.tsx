import AppBar from "../../components/AppBar/AppBar";
import Features from "../../components/Features/Features";
import Hero from "../../components/Hero/Hero";
import LandingModelScene from "../../components/LandingModelScene/LandingModelScene";
import Numbers from "../../components/Numbers/Numbers";
import Partners from "../../components/Partners/Partners";
import css from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <>
      <main className={css.container}>
        <div className={css.model}>
          <LandingModelScene media={"mavic2"} />
        </div>

        <AppBar />
        <Hero />
        <Numbers />
        <Features />
        <Partners />
      </main>
    </>
  );
}
