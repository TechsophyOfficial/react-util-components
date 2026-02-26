import { ReactElement } from 'react';
interface ShimmerProps {
    height: number | string;
    width: number | string;
    borderRadius: number | string;
    darkMode?: boolean;
}
declare const Shimmer: ({ height, width, borderRadius, darkMode, }: ShimmerProps) => ReactElement;
export default Shimmer;
