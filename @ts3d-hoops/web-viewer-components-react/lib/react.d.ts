import { default as React } from 'react';
import { RendererType, StreamingMode } from '@ts3d-hoops/web-viewer';
import { WebViewerComponent as LitWebViewerComponent, WebViewerContextManager, HoopsModelTreeButtonElement, HoopsLayersButtonElement, HoopsViewsButtonElement, HoopsTypesButtonElement, HoopsCadConfigurationButtonElement, HoopsPropertiesButtonElement, HoopsSettingsButtonElement, HoopsHomeButtonElement, HoopsSnapshotButtonElement, HoopsDrawmodeButtonElement, HoopsRedlinesButtonElement, HoopsCameraOperatorButtonElement, HoopsCameraButtonElement, HoopsExplodeButtonElement, HoopsModelTreeElement, HoopsLayerTreeElement, HoopsViewTreeElement, HoopsSheetsButtonElement, HoopsSheetListElement, InfoButton, HoopsContextMenuElement, HoopsToolsButtonElement, HoopsToolsPanelElement, HoopsCadConfigurationListElement, HoopsSettingsPanelElement, HoopsTypesTreeElement, HoopsServiceRegistryElement, HoopsIFCRelationshipElement, HoopsCuttingPlaneEditorElement, HoopsCuttingPlaneToolbarElement, HoopsCuttingPlaneElement, HoopsCuttingPlanePanelElement, HoopsCuttingSectionElement, HoopsCuttingSectionToolbarElement, HoopsBcfPanelElement } from '@ts3d-hoops/web-viewer-components';
declare const BaseWebViewerComponent: import('@lit/react').ReactWebComponent<LitWebViewerComponent, {
    hwvReady: string;
    hwvAddCuttingSection: string;
    hwvAssemblyTreeReady: string;
    hwvBcfLoaded: string;
    hwvBcfRemoved: string;
    hwvBeginInteraction: string;
    hwvCamera: string;
    hwvConfigurationActivated: string;
    hwvCuttingSectionsLoaded: string;
    hwvEndInteraction: string;
    hwvExplode: string;
    hwvHwfParseComplete: string;
    hwvIncrementalSelectionBatchBegin: string;
    hwvIncrementalSelectionBatchEnd: string;
    hwvIncrementalSelectionEnd: string;
    hwvInfo: string;
    hwvLineCreated: string;
    hwvLineDeleted: string;
    hwvLineLoaded: string;
    hwvMeasurementBegin: string;
    hwvMissingModel: string;
    hwvModelLoadBegin: string;
    hwvModelStructureReady: string;
    hwvModelSwitchStart: string;
    hwvOverlayViewportSet: string;
    hwvRemoveCuttingSection: string;
    hwvSceneReady: string;
    hwvSheetActivated: string;
    hwvSheetDeactivated: string;
    hwvStreamingActivated: string;
    hwvStreamingDeactivated: string;
    hwvSubtreeDeleted: string;
    hwvTimeout: string;
    hwvTimeoutWarning: string;
    hwvTransitionBegin: string;
    hwvTransitionEnd: string;
    hwvViewCreated: string;
    hwvViewDeactivated: string;
    hwvViewDeleted: string;
    hwvViewLoaded: string;
    hwvViewOrientation: string;
    hwvWalkOperatorActivated: string;
    hwvWalkOperatorDeactivated: string;
    hwvWebGlContextLost: string;
    hwvWebsocketConnectionClosed: string;
    hwvXHRonerror: string;
    hwvXHRonprogress: string;
    hwvCadViewCreated: string;
    hwvCappingIdle: string;
    hwvContextMenu: string;
    hwvCuttingPlaneDragStart: string;
    hwvCuttingPlaneDrag: string;
    hwvCuttingPlaneDragEnd: string;
    hwvFirstModelLoaded: string;
    hwvFrameDrawn: string;
    hwvHandleEventStart: string;
    hwvHandleEvent: string;
    hwvHandleEventEnd: string;
    hwvMeasurementCreated: string;
    hwvMeasurementDeleted: string;
    hwvMeasurementHidden: string;
    hwvMeasurementLoaded: string;
    hwvMeasurementShown: string;
    hwvMeasurementValueSet: string;
    hwvModelLoadFailure: string;
    hwvModelStructureHeaderParsed: string;
    hwvModelSwitched: string;
    hwvNoteTextCreated: string;
    hwvNoteTextHidden: string;
    hwvNoteTextShown: string;
    hwvRedlineCreated: string;
    hwvRedlineDeleted: string;
    hwvRedlineUpdated: string;
    hwvSelectionArray: string;
    hwvSubtreeLoaded: string;
    hwvViewAxes: string;
    hwvVisibilityChanged: string;
    hwvXHRonloadend: string;
}>;
type BaseWebViewerComponentProps = React.ComponentProps<typeof BaseWebViewerComponent>;
type WebViewerComponentProps = Omit<BaseWebViewerComponentProps, 'rendererType' | 'streamingMode'> & {
    rendererType?: RendererType | 'client' | 'server';
    streamingMode?: StreamingMode | 'interactive' | 'all' | 'ondemand' | 'default';
};
/**
 * React wrapper for the hoops-web-viewer web component.
 *
 * See WebViewerComponent from @ts3d-hoops/web-viewer-components for complete documentation and examples.
 */
export declare const WebViewerComponent: React.ForwardRefExoticComponent<Omit<WebViewerComponentProps, "ref"> & React.RefAttributes<LitWebViewerComponent>>;
export declare const HoopsWebviewerContextManager: import('@lit/react').ReactWebComponent<WebViewerContextManager, {}>;
export declare const HoopsServiceRegistry: import('@lit/react').ReactWebComponent<HoopsServiceRegistryElement, {}>;
export declare const HoopsModelTreeButton: import('@lit/react').ReactWebComponent<HoopsModelTreeButtonElement, {}>;
export declare const HoopsLayersButton: import('@lit/react').ReactWebComponent<HoopsLayersButtonElement, {}>;
export declare const HoopsSheetsButton: import('@lit/react').ReactWebComponent<HoopsSheetsButtonElement, {}>;
export declare const HoopsViewsButton: import('@lit/react').ReactWebComponent<HoopsViewsButtonElement, {}>;
export declare const HoopsTypesButton: import('@lit/react').ReactWebComponent<HoopsTypesButtonElement, {}>;
export declare const HoopsPropertiesButton: import('@lit/react').ReactWebComponent<HoopsPropertiesButtonElement, {}>;
export declare const HoopsCadConfigurationButton: import('@lit/react').ReactWebComponent<HoopsCadConfigurationButtonElement, {}>;
export declare const HoopsSettingsButton: import('@lit/react').ReactWebComponent<HoopsSettingsButtonElement, {}>;
export declare const HoopsHomeButton: import('@lit/react').ReactWebComponent<HoopsHomeButtonElement, {}>;
export declare const HoopsSnapshotButton: import('@lit/react').ReactWebComponent<HoopsSnapshotButtonElement, {}>;
export declare const HoopsDrawmodeButton: import('@lit/react').ReactWebComponent<HoopsDrawmodeButtonElement, {}>;
export declare const HoopsRedlinesButton: import('@lit/react').ReactWebComponent<HoopsRedlinesButtonElement, {}>;
export declare const HoopsCameraOperatorButton: import('@lit/react').ReactWebComponent<HoopsCameraOperatorButtonElement, {}>;
export declare const HoopsCameraButton: import('@lit/react').ReactWebComponent<HoopsCameraButtonElement, {}>;
export declare const HoopsExplodeButton: import('@lit/react').ReactWebComponent<HoopsExplodeButtonElement, {}>;
export declare const HoopsToolsButton: import('@lit/react').ReactWebComponent<HoopsToolsButtonElement, {}>;
export declare const HoopsToolsPanel: import('@lit/react').ReactWebComponent<HoopsToolsPanelElement, {}>;
export declare const HoopsSettingsPanel: import('@lit/react').ReactWebComponent<HoopsSettingsPanelElement, {}>;
export declare const HoopsModelTree: import('@lit/react').ReactWebComponent<HoopsModelTreeElement, {
    modelTreeNodeVisibilityChange: string;
    modelTreeNodeClick: string;
}>;
export declare const HoopsIFCRelationship: import('@lit/react').ReactWebComponent<HoopsIFCRelationshipElement, {}>;
export declare const HoopsLayerTree: import('@lit/react').ReactWebComponent<HoopsLayerTreeElement, {
    layerClick: string;
    layerTreeNodeClick: string;
    layerTreeVisibilityChanged: string;
}>;
export declare const HoopsViewTree: import('@lit/react').ReactWebComponent<HoopsViewTreeElement, {
    viewTreeNodeClick: string;
}>;
export declare const HoopsSheetList: import('@lit/react').ReactWebComponent<HoopsSheetListElement, {
    sheetListNodeClick: string;
}>;
export declare const HoopsTypesTree: import('@lit/react').ReactWebComponent<HoopsTypesTreeElement, {
    typesTreeNodeClick: string;
    typesTreeTypeNodeClick: string;
    typesTreeNodeVisibilityChange: string;
}>;
export declare const HoopsCadConfigurationList: import('@lit/react').ReactWebComponent<HoopsCadConfigurationListElement, {
    cadConfigurationListClick: string;
}>;
export declare const HoopsInfoButton: import('@lit/react').ReactWebComponent<InfoButton, {}>;
export declare const HoopsContextMenu: import('@lit/react').ReactWebComponent<HoopsContextMenuElement, {
    contextMenuItemClicked: string;
}>;
export declare const HoopsCuttingPlaneEditor: import('@lit/react').ReactWebComponent<HoopsCuttingPlaneEditorElement, {
    onChange: string;
}>;
export declare const HoopsCuttingPlaneToolbar: import('@lit/react').ReactWebComponent<HoopsCuttingPlaneToolbarElement, {
    onChange: string;
}>;
export declare const HoopsCuttingPlane: import('@lit/react').ReactWebComponent<HoopsCuttingPlaneElement, {
    onChange: string;
}>;
export declare const HoopsCuttingPlanePanel: import('@lit/react').ReactWebComponent<HoopsCuttingPlanePanelElement, {
    onChange: string;
}>;
export declare const HoopsCuttingSection: import('@lit/react').ReactWebComponent<HoopsCuttingSectionElement, {
    onChange: string;
}>;
export declare const HoopsCuttingSectionToolbar: import('@lit/react').ReactWebComponent<HoopsCuttingSectionToolbarElement, {
    onChange: string;
}>;
export declare const HoopsBcfPanel: import('@lit/react').ReactWebComponent<HoopsBcfPanelElement, {
    bcfCreated: string;
    bcfImported: string;
    topicCreated: string;
    topicRemoved: string;
    topicClicked: string;
    commentCreated: string;
    commentRemoved: string;
}>;
export {};
