import { Triangle } from "react-loader-spinner";
import css from "./Loader.module.css";

type Props = {
  size: string;
};

export default function Loader({ size }: Props) {
  return (
    <>
      <div className={css.container}>
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
