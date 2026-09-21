import { Camera } from './Camera';
import { ViewKey } from './misc';
export type OverlayIndex = number;
export interface OverlayId {
    viewKey: number;
    overayIndex: OverlayIndex;
}
export declare enum OverlayAnchor {
    UpperLeftCorner = 0,
    LowerLeftCorner = 1,
    LowerRightCorner = 2,
    UpperRightCorner = 3,
    TopCenter = 4,
    LeftCenter = 5,
    RightCenter = 6,
    BottomCenter = 7,
    Center = 8
}
export declare enum OverlayUnit {
    Pixels = 0,
    ProportionOfScreen = 1,
    MinimumProportionOfScreen = 2,
    ProportionOfOtherDimension = 3
}
export interface OverlayInterface {
    destroy(viewKey: ViewKey, index: OverlayIndex): void;
    maxIndex(): OverlayIndex;
    setCamera(viewKey: ViewKey, index: OverlayIndex, Camera: Camera): void;
    setViewport(viewKey: ViewKey, index: OverlayIndex, anchor: OverlayAnchor, xOffset: number, xUnit: OverlayUnit, yOffset: number, yUnit: OverlayUnit, width: number, widthUnit: OverlayUnit, height: number, heightUnit: OverlayUnit): void;
    setVisible(viewKey: ViewKey, index: OverlayIndex, visibility: boolean): void;
}
