import { NodeId, NodeType } from './types';
import { TreeNodeType } from './internal/tree/node/types';
export interface ObjectConstructor {
    setPrototypeOf(o: any, proto: object | null): any;
}
/**
 * Base error class for all Communicator errors. Extends base Error class as documented [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error).
 */
export declare class CommunicatorError extends Error {
    /**
     * Creates a new CommunicatorError
     */
    constructor(message: string);
}
/**
 * Error object that is thrown when a user supplies an invalid user data index.
 */
export declare class InvalidIndexError extends CommunicatorError {
    /**
     * Creates a new InvalidIndexError
     */
    constructor(index: number | string);
}
/**
 * Error object that is thrown when a user attempts to pick from a point outside the viewer canvas.
 */
export declare class PickOutsideCanvasError extends CommunicatorError {
    /**
     * Creates a new PickOutsideCanvasError
     */
    constructor();
}
/**
 * Error object that is thrown when an asynchronous selection error occurs.
 * If this error is thrown when beginning a selection, that operation failed to start.
 * If this error is thrown when advancing a selection, the handle is no longer valid.  In this case the operation has already completed.
 */
export declare class SelectionInvalidatedError extends CommunicatorError {
    /**
     * Creates a new SelectionInvalidatedError
     */
    constructor();
}
/**
 * Error object that is thrown when the viewer has entered into an invalid state.
 * This most likely is due to an error in the viewer.  Please reach out to support if you can reliably reproduce this error.
 */
export declare class InternalLogicError extends CommunicatorError {
    /**
     * Creates a new InternalLogicError
     */
    constructor();
}
/**
 * Error object that is thrown when the user passes an non existent NodeId to a function.
 */
export declare class InvalidNodeIdError extends CommunicatorError {
    /**
     * Creates a new InvalidNodeIdError
     */
    constructor(nodeId: NodeId);
    readonly nodeId: NodeId;
}
/**
 * Error object that is thrown when the user passes a node of the incorrect type to a function.
 */
export declare class InvalidNodeTypeError extends CommunicatorError {
    /**
     * Creates a new InvalidNodeTypeError
     */
    constructor(nodeId: NodeId, expectedTreeType: TreeNodeType, ...expectedTreeTypes: TreeNodeType[]);
    readonly nodeId: NodeId;
    readonly expectedTypes: NodeType[];
}
/**
 * Error object that is thrown when a model could not be loaded.
 * This can be triggered when trying to load a streaming model into an SCS session or vise versa.
 * This error object will also be thrown if an invalid URL is supplied when trying to load a SCS file.
 */
export declare class LoadError extends CommunicatorError {
    /**
     * Creates a new LoadError
     */
    constructor(message: string);
}
/**
 * Error object that is thrown when a model load is initiated during an invalid time such as when the model is currently being reset.
 */
export declare class LoadCancelledError extends LoadError {
    /**
     * Creates a new LoadCancelledError
     */
    constructor();
}
/**
 * Error object that is thrown when an invalid model path is specified when trying to load a model in a network session.
 */
export declare class MissingModelError extends LoadError {
    /**
     * Creates a new MissingModelError
     */
    constructor(modelPath: string);
}
/**
 * Error object that is thrown when invalid data is supplied to a function.
 */
export declare class ParseError extends CommunicatorError {
    /**
     * Creates a new ParseError
     */
    constructor(message: string);
}
/**
 * Error object that is thrown when assembly tree data could not be parsed.
 * This usually indicates an error with Communicator itself. Please reach out to support if you can reliably reproduce this error.
 */
export declare class AssemblyDataParseError extends ParseError {
    /**
     * Creates a new AssemblyDataParseError
     */
    constructor(message: string);
}
/**
 * Error object that is thrown when attempting to parse XML data.
 * This can be thrown in the case of an actual parsing error or a malformed XML file.
 * The error object itself will provide a detailed description of the error.
 */
export declare class XmlParseError extends ParseError {
    /**
     * Creates a new XmlParseError
     */
    constructor(message: string);
}
