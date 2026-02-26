import { FC, MouseEvent, ReactNode } from 'react';
export interface ImageData {
    url: string;
    title?: string;
}
export interface LightboxProps {
    images: ImageData[] | string[];
    isOnlyOneImage?: boolean;
    imageIndex?: number;
    image?: string;
    title?: string;
    onClose?: (e?: MouseEvent) => void;
    onNavigateImage?: (index: number) => void;
    zoomStep?: number;
    allowZoom?: boolean;
    doubleClickZoom?: number;
    clickOutsideToExit?: boolean;
    keyboardInteraction?: boolean;
    allowRotate?: boolean;
    showTitle?: boolean;
    allowReset?: boolean;
}
export interface LightboxState {
    x: number;
    y: number;
    zoom: number;
    rotate: number;
    loading: boolean;
    moving: boolean;
    current: number;
    multi: boolean;
}
export interface ConditionProps {
    condition: string | boolean | LightboxState | ((...args: MouseEvent[]) => void);
    children: ReactNode;
}
declare const Lightbox: FC<LightboxProps>;
export default Lightbox;
