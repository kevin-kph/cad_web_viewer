/**
 * Distance configuration used when BIM mode is enabled.
 * See also: [[CameraWalkBaseOperator.enableBimMode]].
 */
export interface FloorConfig {
    /**
     * The offset from the floor used for the avatar.
     */
    avatarOffset: number;
    /**
     * The maximum gain in height the avatar is allowed to scale.
     */
    maxClimbHeight: number;
    /**
     * Any gain in height less than this distance does not cause the avatar to buoy upward.
     */
    negligibleClimbHeight: number;
    /**
     * The maximum distance the avatar can fall.
     */
    maxFallDistance: number;
}
/**
 * Distance configuration used when BIM mode is enabled.
 * See also: [[CameraWalkBaseOperator.enableBimMode]].
 */
export interface WallConfig {
    /**
     * The offset from walls used for the avatar.
     */
    avatarOffset: number;
}
/**
 * Distance configuration used when BIM mode is enabled.
 * See also: [[CameraWalkBaseOperator.enableBimMode]].
 */
export interface DoorConfig {
    /**
     * The range from the avatar used to turn doors transparent.
     */
    transparencyRange: number;
}
/**
 * The defaults used for [[FloorConfig]].
 */
export declare enum DefaultFloorConfig {
    avatarOffset = 1500,
    maxClimbHeight = 600,
    negligibleClimbHeight = 20,
    maxFallDistance = 5000
}
/**
 * The defaults used for [[WallConfig]].
 */
export declare enum DefaultWallConfig {
    avatarOffset = 150
}
/**
 * The defaults used for [[DoorConfig]].
 */
export declare enum DefaultDoorConfig {
    transparencyRange = 4000
}
