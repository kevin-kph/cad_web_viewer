import { Point2 } from '@ts3d-hoops/common';
import { MouseInputEvent } from '../event/MouseInputEvent';
import { TouchInputEvent } from '../event/TouchInputEvent';
import { Button, KeyModifiers } from '../types';
import { ButtonModifier } from './ButtonModifier';
import { Operator } from './types';
import { IView } from '../core/IView';
import { IWebViewer } from '../core/IWebViewer';
/**
 * Base class for operators that handle mouse and touch input. It provides common functionality
 * for tracking mouse and touch events, as well as button and key modifier mappings. It is a Base
 * class with No-OP hook methods (non virtual interface), meaning that it provides a default
 * implementation for all methods, but can be extended by child classes to override specific
 * behavior.
 */
export declare class OperatorBase implements Operator {
    /** @hidden */
    protected _viewer: IWebViewer;
    /** @hidden */
    protected _view: IView;
    /** @hidden */
    protected _ptFirst: Point2;
    /** @hidden */
    protected _ptPrevious: Point2;
    /** @hidden */
    protected _ptCurrent: Point2;
    /** @hidden */
    protected _dragging: boolean;
    /** @hidden */
    protected _dragCount: number;
    /** @hidden */
    protected _primaryTouchId: number | null;
    /** @hidden */
    protected _mapping: ButtonModifier[];
    /** @hidden */
    protected _buttonModifierActive: boolean;
    /** @hidden */
    protected _doubleClickInterval: number;
    /** @hidden */
    protected _firstMouseDownTime: number | null;
    /** @hidden */
    protected _isDoubleClick: boolean;
    /** @hidden */
    constructor(viewer: IWebViewer, view: IView);
    /**
     * NO-OP method for handling double click events. By default, it does nothing, but child
     * classes can override this method to provide specific behavior for double click events.
     * @param _event The double click event to handle.
     */
    onDoubleClick(_event: MouseInputEvent): void;
    /**
     * Base method for handling mouse down events. It tracks the time between mouse down events
     * to determine if a double click has occurred, and checks the button and key modifier
     * mapping to determine if the operator should be activated. If the operator is activated,
     * it stores the initial mouse position and sets the dragging state to true.
     * @param event The mouse down event to handle.
     */
    onMouseDown(event: MouseInputEvent): void;
    /**
     * Base method for handling mouse move events. If the operator is active, it updates the
     * current mouse position and, if dragging, increments the drag count. If this is the first
     * drag event, it triggers the "beginInteraction" event on the viewer.
     * @param event The mouse move event to handle.
     */
    onMouseMove(event: MouseInputEvent): void;
    /**
     * Base method for handling mouse up events. It stops the interaction if the operator is
     * active, and resets the dragging state and drag count.
     * @param _event The mouse up event to handle.
     */
    onMouseUp(_event: MouseInputEvent): void;
    /**
     * Stops the current interaction by triggering the "endInteraction" event on the viewer, and
     * resets the dragging state, drag count, and button modifier active state.
     */
    stopInteraction(): void;
    /**
     * Checks if the operator is currently dragging.
     * @returns True if the operator is dragging, false otherwise.
     */
    isDragging(): boolean;
    /**
     * Checks if the operator is currently active, which is determined by whether the button and
     * key modifier mapping is active or a touch event is active, and that a double click has
     * not occurred and the context menu is not open.
     * @returns True if the operator is active, false otherwise.
     */
    isActive(): boolean;
    /**
     * Base method for handling touch start events. It tracks the primary touch point and
     * emulates a mouse down event using the touch position. If there is already an active
     * touch, it ignores additional touch start events.
     * @param event The touch start event to handle.
     */
    onTouchStart(event: TouchInputEvent): void;
    /**
     * Base method for handling touch move events. If the touch event corresponds to the primary
     * touch point, it emulates a mouse move event using the touch position. It awaits the
     * onMouseMove method to allow for asynchronous behavior in child classes.
     * @param event The touch move event to handle.
     */
    onTouchMove(event: TouchInputEvent): Promise<void>;
    /**
     * Base method for handling touch end events. If the touch event corresponds to the primary
     * touch point, it emulates a mouse up event using the touch position and resets the primary
     * touch ID. It also sets the event as handled based on the operator's setHandled method.
     * @param event The touch end event to handle.
     */
    onTouchEnd(event: TouchInputEvent): void;
    /**
     * Adds a button and key modifier mapping for the operator. If no mapping is provided, all combinations are considered valid.
     * All mappings require a mouse button, but a key modifier is optional.
     * @param button
     * @param modifier
     */
    addMapping(button: Button, modifier?: KeyModifiers): void;
    /**
     * Clears any button and key modifier mappings for the operator.
     */
    clearMapping(): void;
    /**
     * Sets the button and key modifier mapping for the operator.
     * @param button
     * @param modifier
     */
    setMapping(button: Button, modifier?: KeyModifiers): void;
    /**
     * Checks if the given mouse event matches any of the button and key modifier mappings for
     * the operator. If no mappings are defined, it returns true.
     * @param event The mouse event to check against the operator's mappings.
     * @returns True if the event matches any mapping or if no mappings are defined, false otherwise.
     */
    checkMapping(event: MouseInputEvent): boolean;
    /**
     * Base method for setting the handled state of events. By default, it returns false,
     * but child classes can override this method to provide specific behavior for determining
     * whether events should be marked as handled.
     * @returns True if the event should be marked as handled, false otherwise.
     */
    setHandled(): boolean;
    /**
     * Called when the operator is deactivated. This method stops any ongoing interactions and
     * resets the primary touch ID. It can be overridden by child classes to provide additional
     * cleanup behavior when the operator is deactivated.
     * @returns A promise that resolves when the deactivation process is complete, or void if no asynchronous operations are performed.
     */
    onDeactivate(): void | Promise<void>;
}
