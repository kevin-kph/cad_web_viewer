import { DrawModeName, OperatorId } from '@ts3d-hoops/web-viewer';
export interface WebViewerState {
    drawMode: DrawModeName;
    topCameraOperator: OperatorId;
    toolOperator: OperatorId;
}
export declare const CameraOperatorPosition: 0;
export declare const ActiveToolOperatorPosition: 1;
export declare const redlineModes: readonly [OperatorId.RedlineCircle, OperatorId.RedlineText, OperatorId.RedlineRectangle, OperatorId.RedlinePolyline];
export interface MarkupData {
    id: string;
    icon: unknown;
    title: string;
    type: string;
}
