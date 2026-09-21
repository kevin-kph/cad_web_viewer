import { Point3, Color } from '@ts3d-hoops/common';
import { LightSpace, LightType } from '@ts3d-hoops/streamcache';
/**
 * Contains properties of a light. More information can be found [here](https://docs.techsoft3d.com/hoops/visualize-web/prog_guide/viewing/scene_attributes/lights.html).
 */
export declare class Light {
    /** The light's type. */
    type: LightType;
    /** The space in which the light's position is defined. */
    space: LightSpace;
    /**
     * The light's position in the scene. See [[LightType.Directional]]
     * for information on how the position is interpreted for directional
     * lights.
     */
    position: Point3;
    /** The light's color. */
    color: Color;
    /**
     * @param type The light's type. See [[type]].
     * @param space The space in which a light is defined. See [[space]]
     * @param position The light's position. See [[position]].
     * @param color The light's color. See [[color]].
     */
    constructor(type: LightType, space: LightSpace, position: Point3, color: Color);
}
/**
 * Contains properties of a directional light. More information can be found [here](https://docs.techsoft3d.com/hoops/visualize-web/prog_guide/viewing/scene_attributes/lights.html).
 * See [[LightType.Directional]] for information on how the position is interpreted for directional lights.
 */
export declare class DirectionalLight extends Light {
    constructor(type: LightType, space: LightSpace, position: Point3, color: Color);
}
/**
 * Contains properties of a point light. More information can be found [here](https://docs.techsoft3d.com/hoops/visualize-web/prog_guide/viewing/scene_attributes/lights.html).
 */
export declare class PointLight extends Light {
    /** How bright the light is */
    power: number;
    /** How quickly the light will attenuate as it travels further from its source */
    decay: number;
    /**
     * @param type The light's type. See [[type]].
     * @param space The space in which a light is defined. See [[space]]
     * @param position The light's position. See [[position]].
     * @param color The light's color. See [[color]].
     * @param power The light's power. See [[power]].
     * @param decay The light's power. See [[decay]].
     */
    constructor(type: LightType, space: LightSpace, position: Point3, color: Color, power: number, decay: number);
}
