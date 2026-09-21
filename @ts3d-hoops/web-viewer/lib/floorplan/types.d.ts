/** Different conditions on which the floorplan can be activated automatically. */
export declare enum FloorplanAutoActivation {
    /** Never activate the floorplan automatically. */
    Never = 0,
    /** Activate the floorplan when a BIM model is loaded. */
    Bim = 1,
    /** Activate the floorplan if a BIM model is loaded and a walk operator is active. */
    BimWalk = 2
}
/** States used for activating.
 * @hidden */
export declare enum ActiveState {
    Inactive = "inactive",
    Activating = "activating",// This is needed for the asynchronous needs of activation
    Active = "active"
}
