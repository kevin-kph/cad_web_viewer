import { Point2, Color } from '@ts3d-hoops/common';
import { NodeId, FloorplanOrientation, OverlayAnchor, OverlayUnit } from '../types';
import { FloorplanAutoActivation } from './types';
export declare class FloorplanConfig {
    /** The [[OverlayAnchor]] for the floorplan overlay window. See [[OverlayManager.setViewport]].
     *  (default: [[OverlayAnchor.LowerRightCorner]]) */
    overlayAnchor: OverlayAnchor;
    /** Determines the size of the overlay. See [[OverlayManager.setViewport]] for an understanding
     *  of how the size and [[OverlayUnit]] values are used. (default: `0.25, 1.0`) */
    overlaySize: Point2;
    /** The [[OverlayUnit]] type for the [[overlaySize]] width. (default: [[OverlayUnit.ProportionOfCanvas]]) */
    overlayWidthUnit: OverlayUnit;
    /** The [[OverlayUnit]] type for the [[overlaySize]] height. (default: [[OverlayUnit.ProportionOfOtherDimension]]) */
    overlayHeightUnit: OverlayUnit;
    /** The X/Y values used with [[OverlayManager.setViewport]]. (default: `0, 0`) */
    overlayOffset: Point2;
    /** The [[OverlayUnit]] type for the [[overlayOffset]] x coordinate. (default: [[OverlayUnit.Pixels]])*/
    overlayOffsetXUnit: OverlayUnit;
    /** The [[OverlayUnit]] type for the [[overlayOffset]] y coordinate. (default: [[OverlayUnit.Pixels]])*/
    overlayOffsetYUnit: OverlayUnit;
    /** Determines the background color of the overlay window. (default: `white`) */
    backgroundColor: Color;
    /** Determines the opacity of the overlay background. Valid values must be in the range `[0, 1]`. (default: `0.25`) */
    backgroundOpacity: number;
    /** Determines the color of the overlay window border. (default: `black`) */
    borderColor: Color;
    /** Determines the opacity of the overlay window border. Valid values must be in the range `[0, 1]`. (default: `1.0`) */
    borderOpacity: number;
    /** Determines the primary color of the avatar shown in the overlay. (default: `Color(255,0,255)`) */
    avatarColor: Color;
    /** Determines the outline color of the avatar shown in the overlay. (default: `black`) */
    avatarOutlineColor: Color;
    /** Determines the opacity of the avatar. Valid values must be in the range `[0, 1]`. (default: `1.0`) */
    avatarOpacity: number;
    /** Determines the scale-factor of the avatar. Valid values must be in the range `[0.1, 10]`. (default: `1.0`) */
    avatarScale: number;
    /**
     * When this is `false`, the avatar size will scale with the floorplan size. For large floorplans, the avatar may appear small.
     * When this is `true`, the avatar will be the same size for all floorplans. (default: `true`)
     */
    fixedAvatarScale: boolean;
    /** Determines the scale of the floorplan within the overlay window in terms of feet-per-pixel. This value
     *  is combined with [[zoomLevel]] to determine the overall display scaling.
     *  The intent is for this value to stay fixed after being set initially, while [[zoomLevel]] is used to
     *  easily change the zoom-level of the overlay */
    overlayFeetPerPixel: number;
    /** Sets the zoom level for the floorplan display. A value of 1.0 is the standard view. Values greater will
     *  zoom-in, while smaller values will zoom-out. Valid values must be in the range `[0.1, 10]`. (default: `1.0`) */
    zoomLevel: number;
    /** Determines the conditions under which the floorplan will be auto-activated. (default: [[FloorplanAutoActivation.BimWalk]]) */
    autoActivate: FloorplanAutoActivation;
    /** Determines the drawing orientation of floorplan and avatar. (default: [[FloorplanOrientation.NorthUp]]) */
    floorplanOrientation: FloorplanOrientation;
    /** Setting this to a valid [[NodeId]] will allow for a custom avatar. To use a custom avatar, consider the following:
     *
     *  - The overlay always draws in orthographic mode with the camera pointing down the Z axis from + to -. The avatar
     *    geometry is therefore assumed to be defined in the X/Y plane, with forward pointing in the positive Y direction.
     *  - The avatar is scaled under the assumption that its units are in feet and the actual camera-eye will
     *    correspond to `0,0,0` within the avatar geometry.
     *  - The [[FloorplanManager]] will take ownership of the custom node. The caller should not try to delete it, ever.
     *  - The custom node will survive across model changes.
     *  - The custom node will survive across any calls to [[deactivate]].
     *  - Any previous custom avatar node will be deleted when a new custom avatar is set.
     *  - Setting this to `null` will restore the default avatar.
     *  - The avatar background and outline colors/opacities will *not* be applied to a custom avatar. The user
     *    must set these manually as needed for any custom avatar. The custom avatar [[NodeId]] will not change and can
     *    thus be maintained by the user for setting node properties as needed.
     *
     * (default: `null`)
     */
    customAvatar: NodeId | null;
    /**
     * Setting this to `true` will move the floorplan with the camera to keep the avatar centered.
     * When this is `false`, the floorplan will stay fixed in place, and the avatar will move.
     */
    trackCameraEnabled: boolean;
    /**
     * Per-floor information.
     * @returns Copy of this configuration object.
     */
    copy(): FloorplanConfig;
}
