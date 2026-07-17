import { LoaderPositionType } from "../../types/common.types";

import css from "./Loader.module.css";

type Props = {
  position: LoaderPositionType;
  size: string;
};

export default function Loader({ position, size }: Props) {
  return (
    <div className={css.container} style={{ position: position }}>
      <span
        className={css.spinner}
        style={{ width: `${size}px`, height: `${size}px` }}
        role="status"
        aria-label="Завантаження"
      />
    </div>
  );
}
