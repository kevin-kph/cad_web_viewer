export interface SnappingConfig {
    enabled: boolean;
    preferVertices: boolean;
}
export declare enum Stage {
    NoPointsSelected = 0,
    OnePointSelected = 1,
    TwoPointsSelected = 2
}
export declare enum MeasurePolygonAreaAnchor {
    /** Text box indicating measurement value will be anchored to the first point of the polygon. */
    First = 0,
    /** Text box indicating measurement value will be anchored to the last point of the polygon.*/
    Last = 1,
    /** Text box indicating measurement value will be anchored to the midpoint of the polygon.*/
    Midpoint = 2
}
export declare enum MeasurePolylineDistanceAnchor {
    /** Text box indicating measurement value will be anchored to the first point of the polyline. */
    First = 0,
    /** Text box indicating measurement value will be anchored to the last point of the polyline.*/
    Last = 1,
    /** Text box indicating measurement value will be anchored to the midpoint of the polyline.*/
    Midpoint = 2
}
