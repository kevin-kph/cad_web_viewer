import { OperatorBase } from './OperatorBase';
import { IView } from '../core/IView';
import { IWebViewer } from '../core/IWebViewer';
/**
 * Provide camera movement for the 3Dconnexion SpaceMouse.
 */
export declare class SpaceMouseOperator extends OperatorBase {
    private _modelBounding;
    private _selectionBounding;
    private _pivot;
    private _pivotMarkup;
    private _hitRayOrigin;
    private _hitRayDirection;
    private _hitRayAperture;
    private _hitRaySelectionOnly;
    private _hitRaySelectionItem;
    private _client;
    private _connexion;
    private _3dMouseInitialized;
    private _isWebViewerShutdown;
    private _updateModelBounding;
    private _updateSelectionBounding;
    private _updateHitTest;
    constructor(viewer: IWebViewer, view: IView);
    /**
     * Connect to the space mouse. To be successful, this method
     * should be called in the sceneReady callback. If you want to
     * connect at a later time, the canvas where the mouse is
     * to be used must have focus.
     *
     * Note: If this is called but the 3d connexion software is not running,
     * a connection error will be shown in the console.
     */
    connect(): void;
}
