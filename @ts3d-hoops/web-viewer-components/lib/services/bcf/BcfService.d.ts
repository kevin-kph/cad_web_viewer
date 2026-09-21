import { Bcf, WebViewer } from '@ts3d-hoops/web-viewer';
import { IBcfService } from './types';
/**
 * Provides BCF operations while encapsulating direct WebViewer access.
 */
export default class BcfService extends EventTarget implements IBcfService {
    readonly serviceName: "BcfService";
    private _webViewer?;
    private _topicMarkupCameraCallbacks?;
    get webViewer(): WebViewer | undefined;
    set webViewer(value: WebViewer | undefined);
    /** {@inheritDoc IBcfService.getBCFMap} */
    getBCFMap(): Map<number, Bcf.BCFData>;
    /** {@inheritDoc IBcfService.getBCFData} */
    getBCFData(id: number): Bcf.BCFData | null;
    /** {@inheritDoc IBcfService.createBCFData} */
    createBCFData(name: string): Bcf.BCFData;
    /** {@inheritDoc IBcfService.addBCFFromBuffer} */
    addBCFFromBuffer(buffer: ArrayBuffer, fileName: string): Promise<void>;
    /** {@inheritDoc IBcfService.removeBCFData} */
    removeBCFData(id: number): void;
    /** {@inheritDoc IBcfService.createTopic} */
    createTopic(bcfData: Bcf.BCFData, topicId: string): Bcf.BCFTopic;
    /**
     * Creates a fully initialized BCF topic: markup, title, viewpoint, snapshot, and registers it on the BCF data.
     *
     * @param bcfData - The BCF data set to add the topic to.
     * @param title - The human-readable topic title.
     * @param captureView - The active markup view to capture in the topic viewpoint, or null/undefined.
     * @returns The fully initialized BCF topic.
     */
    setupTopic(bcfData: Bcf.BCFData, title: string, captureView: unknown): Promise<Bcf.BCFTopic>;
    /**
     * Creates a comment on a BCF topic, including its viewpoint and snapshot.
     *
     * @param topic - The BCF topic to add the comment to.
     * @param text - The comment text.
     * @param captureView - The active markup view to capture in the comment viewpoint, or null/undefined.
     * @returns An object containing the new comment's ID.
     */
    addTopicComment(topic: Bcf.BCFTopic, text: string, captureView: unknown): Promise<{
        commentId: string;
    }>;
    /** {@inheritDoc IBcfService.getMarkupViewForBcfCapture} */
    getMarkupViewForBcfCapture(): unknown;
    /** {@inheritDoc IBcfService.createViewpoint} */
    createViewpoint(viewpointFilename: string, captureView: unknown): Promise<Bcf.BCFViewpoint>;
    /**
     * Captures the current viewer state as a PNG image using `WebViewer.takeSnapshot()`.
     *
     * @returns PNG bytes of the snapshot, or null if capture fails or viewer is not initialized.
     */
    captureSnapshotPng(): Promise<Uint8Array | null>;
    /** {@inheritDoc IBcfService.activateTopicAndRestoreMarkup} */
    activateTopicAndRestoreMarkup(topic: Bcf.BCFTopic, markupViewId?: string): Promise<void>;
    /**
     * Clears currently active topic markup overlays from the viewer.
     *
     * This centralizes direct markup-manager interactions behind the service API.
     */
    clearActiveTopicMarkup(): Promise<void>;
    /** {@inheritDoc IBcfService.clearTopicMarkupAutoDeactivate} */
    clearTopicMarkupAutoDeactivate(): void;
    private _armTopicMarkupAutoDeactivate;
}
