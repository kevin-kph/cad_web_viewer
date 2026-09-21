import { DrawMode, DrawModeName, NodeDrawMode, NodeDrawModeName, Uuid } from './types';
export declare function createUuid(): Uuid;
/** Converts a numeric {@link DrawMode} value to its {@link DrawModeName} string representation. */
export declare function drawModeToName(mode: DrawMode): DrawModeName;
/** Converts a {@link DrawModeName} string to its numeric {@link DrawMode} equivalent. */
export declare function drawModeFromName(name: DrawModeName): DrawMode;
/** Converts a numeric {@link NodeDrawMode} value to its {@link NodeDrawModeName} string representation. */
export declare function nodeDrawModeToName(mode: NodeDrawMode): NodeDrawModeName;
/** Converts a {@link NodeDrawModeName} string to its numeric {@link NodeDrawMode} equivalent. */
export declare function nodeDrawModeFromName(name: NodeDrawModeName): NodeDrawMode;
