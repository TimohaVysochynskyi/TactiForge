import { Triangle } from "react-loader-spinner";

import { LoaderPositionType } from "../../types/common.types";

import css from "./Loader.module.css";

type Props = {
  position: LoaderPositionType;
  size: string;
};

export default function Loader({ position, size }: Props) {
  return (
    <>
      <div className={css.container} style={{ position: position }}>
        <Triangle
          visible={true}
          height={size}
          width={size}
          color="#fff"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  );
}
