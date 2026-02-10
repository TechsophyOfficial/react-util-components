import { type ReactElement } from "react";
import "./Shimmer.css";

interface ShimmerProps {
  height: number | string;
  width: number | string;
  borderRadius: number | string;
  darkMode?: boolean;
}

const Shimmer = ({
  height,
  width,
  borderRadius,
  darkMode = false,
}: ShimmerProps): ReactElement => {
  const shimmerStyle = {
    height,
    width,
    borderRadius,
  };

  return (
    <div
      className={`shimmer ${darkMode ? "dark" : ""}`}
      style={shimmerStyle}
    ></div>
  );
};

export default Shimmer;
