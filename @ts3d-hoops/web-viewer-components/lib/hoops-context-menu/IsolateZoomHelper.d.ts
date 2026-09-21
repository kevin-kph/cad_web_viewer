import { NodeId } from '@ts3d-hoops/web-viewer';
import { IContextMenuWebViewer, IContextMenuModel } from './types';
/**
 * @hidden
 * Removes any ids from the array if they are not contained in the current sheet.
 * @param nodeIds [[NodeId]] array.
 */
export declare function _filterActiveSheetNodeIds(viewer: IContextMenuWebViewer, model: IContextMenuModel, nodeIds: NodeId[]): void;
export declare class IsolateZoomHelper {
    private readonly _viewer;
    private readonly _model;
    private _camera;
    private _deselectOnIsolate;
    private _deselectOnZoom;
    private _isolateStatus;
    constructor(viewer: IContextMenuWebViewer, model: IContextMenuModel);
    private _setCamera;
    setDeselectOnIsolate(deselect: boolean): void;
    getIsolateStatus(): boolean;
    isolateNodes(nodeIds: NodeId[], initiallyHiddenStayHidden?: boolean | null): Promise<void>;
    fitNodes(nodeIds: NodeId[]): Promise<void>;
    showAll(): Promise<void>;
    private _updatePinVisibility;
}
