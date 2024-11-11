import { Navigate, useParams } from "react-router-dom";
import AppBar from "../../components/AppBar/AppBar";
import WeaponScene from "../../components/WeaponScene/WeaponScene";
import css from "./WeaponPage.module.css";

export default function WeaponPage() {
  const { media } = useParams<string>();
  if (!media) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className={css.container}>
        <AppBar />
        <WeaponScene media={media} />
      </div>
    </>
  );
}
