import { ImageId, ImageIds } from './keys';
export declare enum ImageFormat {
    Rgba32 = 0,
    Rgb24 = 1,
    Gray8 = 2,
    GrayAlpha16 = 3,
    Jpeg = 4,
    Png = 5
}
export interface ImageInterface {
    create(mainFormat: ImageFormat, mainData: Uint8Array, mainHasAlpha: boolean, mainWidth?: number, mainHeight?: number, thumbFormat?: ImageFormat, thumbData?: Uint8Array, thumbHasAlpha?: boolean, thumbWidth?: number, thumbHeight?: number): Promise<ImageId>;
    destroy(imageIds: ImageIds): Promise<void>;
}
