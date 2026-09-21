import { KeyInputEvent } from './event/KeyInputEvent';
import { MouseInputEvent, MouseWheelInputEvent } from './event/MouseInputEvent';
import { TouchInputEvent } from './event/TouchInputEvent';
import { AreaSelectionOperator } from './operators/AreaSelectionOperator';
import { CameraKeyboardWalkOperator } from './operators/camera/CameraKeyboardWalkOperator';
import { CameraNavigationOperator } from './operators/camera/CameraNavigationOperator';
import { CameraOrbitOperator } from './operators/camera/CameraOrbitOperator';
import { CameraPanOperator } from './operators/camera/CameraPanOperator';
import { CameraTurntableOperator } from './operators/camera/CameraTurntableOperator';
import { CameraWalkModeOperator } from './operators/camera/CameraWalkModeOperator';
import { CameraWindowZoomOperator } from './operators/camera/CameraWindowZoomOperator';
import { CameraZoomOperator } from './operators/camera/CameraZoomOperator';
import { CuttingPlaneOperator } from './operators/CuttingPlaneOperator';
import { HandleOperator } from './operators/HandleOperator';
import { MeasureEdgeLengthOperator } from './operators/measure/MeasureEdgeLengthOperator';
import { MeasureFaceFaceAngleOperator } from './operators/measure/MeasureFaceFaceAngleOperator';
import { MeasureFaceFaceDistanceOperator } from './operators/measure/MeasureFaceFaceDistanceOperator';
import { MeasurePointPointDistanceOperator } from './operators/measure/MeasurePointPointDistanceOperator';
import { MeasurePolygonAreaOperator } from './operators/measure/MeasurePolygonAreaOperator';
import { MeasurePolylineDistanceOperator } from './operators/measure/MeasurePolylineDistanceOperator';
import { NavCubeOperator } from './operators/NavCubeOperator';
import { NoteOperator } from './operators/NoteOperator';
import { RayDrillSelectionOperator } from './operators/RayDrillSelectionOperator';
import { RedlineCircleOperator } from './operators/redline/RedlineCircleOperator';
import { RedlinePolylineOperator } from './operators/redline/RedlinePolylineOperator';
import { RedlineRectangleOperator } from './operators/redline/RedlineRectangleOperator';
import { RedlineTextOperator } from './operators/redline/RedlineTextOperator';
import { SelectionOperator } from './operators/SelectionOperator';
import { Operator } from './operators/types';
import { BuiltInOperatorId, EventType, OperatorId } from './types';
import { IWebViewer } from './core/IWebViewer';
/**
 * Main interface into the Operator functionality of the viewer.
 * The OperatorManager manages a number of operators in a stack and allows the user to register and unregister new operators.
 */
export declare class OperatorManager {
    private readonly _operatorStack;
    private readonly _operators;
    private _customOperatorIdCount;
    private readonly _customOperatorIdIndex;
    private readonly _viewer;
    private readonly _mergeableEvents;
    private _eventSequencePromise;
    private _events;
    reactivateOperator: (operatorId: OperatorId) => Promise<void>;
    reactivateOperatorStack: () => Promise<void>;
    /** @hidden */
    constructor(viewer: IWebViewer);
    /** @hidden */
    _shutdown(): void;
    /** @hidden */
    _registerOperator(operatorId: BuiltInOperatorId, operator: Operator): void;
    /**
     * Registers a custom operator
     * @param operator
     * @returns operatorId
     */
    registerCustomOperator(operator: Operator): OperatorId;
    /**
     * Removes a custom operator from the registered operator list.
     * @param operatorId
     */
    unregisterCustomOperator(operatorId: OperatorId): void;
    /**
     * Replaces the operator that the specified id refers to. Returns a boolean indicating success or failure.
     * @param previousOperatorId operator id for the operator to be replaced.
     * @param newOperatorId operator id for the new operator.
     */
    replaceOperator(previousOperatorId: OperatorId, newOperatorId: OperatorId): boolean;
    /**
     * Returns the index of an operator on the stack
     * @param operatorId
     * @returns operator index or -1 if not found
     */
    indexOf(operatorId: OperatorId): number;
    /**
     * Adds an operator on the stack if it's not already on the stack
     * @param operatorId id of the operator to add to the stack
     * @returns boolean indicating success or failure
     */
    push(operatorId: OperatorId): boolean;
    /**
     * Sets a position on the stack to an operator if it's not already on the stack
     * If there is already an operator in that position, it is replaced.
     * @param operatorId id of the operator to add to the stack
     * @param position position on the stack to assign
     * @returns boolean indicating success or failure
     */
    set(operatorId: OperatorId, position: number): boolean;
    /**
     * Removes an operator from the top of the stack
     * @returns the operator id
     */
    pop(): OperatorId | undefined;
    /**
     * Removes an operator from the stack
     * @param operatorId id of the operator to remove from the stack
     */
    remove(operatorId: OperatorId): void;
    /**
     * @returns the operator id at the top of the stack
     */
    peek(): OperatorId;
    /**
     * @returns the operator id at the given position of the stack
     * Will return OperatorId.Invalid if position is out of bounds.
     */
    get(position: number): OperatorId;
    /**
     * Removes all operators from the stack
     */
    clear(): void;
    /**
     * @returns the operator stack size
     */
    size(): number;
    /**
     * @param id
     * @returns Operator reference
     */
    getOperator(id: OperatorId.Navigate): CameraNavigationOperator;
    getOperator(id: OperatorId.Orbit): CameraOrbitOperator;
    getOperator(id: OperatorId.Pan): CameraPanOperator;
    getOperator(id: OperatorId.Zoom): CameraZoomOperator;
    getOperator(id: OperatorId.WindowZoom): CameraWindowZoomOperator;
    getOperator(id: OperatorId.Walk): CameraKeyboardWalkOperator;
    getOperator(id: OperatorId.KeyboardWalk): CameraKeyboardWalkOperator;
    getOperator(id: OperatorId.WalkMode): CameraWalkModeOperator;
    getOperator(id: OperatorId.Turntable): CameraTurntableOperator;
    getOperator(id: OperatorId.Select): SelectionOperator;
    getOperator(id: OperatorId.AreaSelect): AreaSelectionOperator;
    getOperator(id: OperatorId.RayDrillSelect): RayDrillSelectionOperator;
    getOperator(id: OperatorId.RedlineCircle): RedlineCircleOperator;
    getOperator(id: OperatorId.RedlineText): RedlineTextOperator;
    getOperator(id: OperatorId.RedlineRectangle): RedlineRectangleOperator;
    getOperator(id: OperatorId.RedlinePolyline): RedlinePolylineOperator;
    getOperator(id: OperatorId.MeasureEdgeLength): MeasureEdgeLengthOperator;
    getOperator(id: OperatorId.MeasureFaceFaceDistance): MeasureFaceFaceDistanceOperator;
    getOperator(id: OperatorId.MeasurePointPointDistance): MeasurePointPointDistanceOperator;
    getOperator(id: OperatorId.MeasureFaceFaceAngle): MeasureFaceFaceAngleOperator;
    getOperator(id: OperatorId.MeasurePolylineDistance): MeasurePolylineDistanceOperator;
    getOperator(id: OperatorId.MeasurePolygonArea): MeasurePolygonAreaOperator;
    getOperator(id: OperatorId.Note): NoteOperator;
    getOperator(id: OperatorId.Cutting): CuttingPlaneOperator;
    getOperator(id: OperatorId.Handle): HandleOperator;
    getOperator(id: OperatorId.NavCube): NavCubeOperator;
    getOperator(id: BuiltInOperatorId): Operator;
    getOperator(id: OperatorId): Operator | null;
    private _injectEvent;
    injectEvent(event: MouseInputEvent | TouchInputEvent | KeyInputEvent | MouseWheelInputEvent, eventType: EventType): Promise<void>;
    private _addOrMergeEventToQueue;
    private _injectNextEvent;
    private _stopInteraction;
    /** @hidden */
    _injectViewOrientationChangeEvent(): void;
    private _isValid;
    private _contains;
    private _activateOperator;
    private _deactivateOperator;
}
