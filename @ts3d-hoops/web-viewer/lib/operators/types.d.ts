import { KeyInputEvent } from '../event/KeyInputEvent';
import { MouseInputEvent, MouseWheelInputEvent } from '../event/MouseInputEvent';
import { TouchInputEvent } from '../event/TouchInputEvent';
export interface Operator {
    readonly onMouseDown?: (event: MouseInputEvent) => void | Promise<void>;
    readonly onMouseMove?: (event: MouseInputEvent) => void | Promise<void>;
    readonly onMouseUp?: (event: MouseInputEvent) => void | Promise<void>;
    readonly onMousewheel?: (event: MouseWheelInputEvent) => void | Promise<void>;
    readonly onTouchStart?: (event: TouchInputEvent) => void | Promise<void>;
    readonly onTouchMove?: (event: TouchInputEvent) => void | Promise<void>;
    readonly onTouchEnd?: (event: TouchInputEvent) => void | Promise<void>;
    readonly onKeyDown?: (event: KeyInputEvent) => void | Promise<void>;
    readonly onKeyUp?: (event: KeyInputEvent) => void | Promise<void>;
    readonly onDeactivate?: () => void | Promise<void>;
    readonly onActivate?: () => void | Promise<void>;
    readonly onViewOrientationChange?: () => void | Promise<void>;
    /**
     * Stops an operator from interacting with the scene.
     */
    readonly stopInteraction?: () => void | Promise<void>;
}
