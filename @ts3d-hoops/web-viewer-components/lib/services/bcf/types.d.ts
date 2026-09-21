import { Bcf, WebViewer } from '@ts3d-hoops/web-viewer';
import { IService } from '../types';
export interface IBcfService extends IService {
    webViewer: WebViewer | undefined;
    /**
     * Returns all BCF data sets currently loaded in the viewer, keyed by their numeric IDs.
     */
    getBCFMap(): Map<number, Bcf.BCFData>;
    /**
     * Returns the BCF data set with the given ID, or `null` if not found or the viewer is unavailable.
     *
     * @param id - The numeric ID of the BCF data set to retrieve.
     */
    getBCFData(id: number): Bcf.BCFData | null;
    /**
     * Creates a new, empty BCF data set with the provided name and registers it with the viewer.
     *
     * @param name - The display name for the new BCF data set.
     * @throws If the viewer is not initialized.
     */
    createBCFData(name: string): Bcf.BCFData;
    /**
     * Imports a BCF archive from an `ArrayBuffer` (e.g., from a file upload) and registers its contents.
     *
     * @param buffer - The raw BCF archive data.
     * @param fileName - The original file name, used as the BCF data set identifier.
     * @throws If the viewer is not initialized.
     */
    addBCFFromBuffer(buffer: ArrayBuffer, fileName: string): Promise<void>;
    /**
     * Removes the BCF data set with the given ID from the viewer.
     *
     * @param id - The numeric ID of the BCF data set to remove.
     * @throws If the viewer is not initialized.
     */
    removeBCFData(id: number): void;
    /**
     * Creates a bare BCF topic shell within the given data set.
     * Prefer {@link setupTopic} for creating a fully initialized topic with markup, viewpoint, and snapshot.
     *
     * @param bcfData - The BCF data set to add the topic to.
     * @param topicId - The unique ID (UUID) to assign to the new topic.
     * @throws If the viewer is not initialized.
     */
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
    /**
     * Resolves the best available markup view for viewpoint capture.
     *
     * Returns the currently active markup view if one exists, or falls back to the most recently
     * modified non-empty view. Returns `null` if no suitable view is found.
     */
    getMarkupViewForBcfCapture(): unknown;
    /**
     * Creates and returns a BCF viewpoint capturing the current viewer camera state,
     * optionally including markup from `captureView`.
     *
     * @param viewpointFilename - The filename to assign to the viewpoint within the BCF archive.
     * @param captureView - The markup view to include in the viewpoint, or null/undefined.
     * @throws If the viewer is not initialized.
     */
    createViewpoint(viewpointFilename: string, captureView: unknown): Promise<Bcf.BCFViewpoint>;
    /**
     * Captures the current rendered frame as a PNG and returns the raw bytes.
     *
     * @returns PNG bytes of the snapshot, or `null` if the viewer is uninitialized or capture fails.
     */
    captureSnapshotPng(): Promise<Uint8Array | null>;
    /**
     * Activates the first viewpoint of the given topic and, if a markup view ID is provided,
     * restores the corresponding markup overlay and arms the camera auto-deactivation callback.
     *
     * @param topic - The BCF topic whose viewpoint should be activated.
     * @param markupViewId - Optional ID of the markup view to restore.
     * @throws If the viewer is not initialized.
     */
    activateTopicAndRestoreMarkup(topic: Bcf.BCFTopic, markupViewId?: string): Promise<void>;
    /**
     * Clears all active markup overlays and lines from the viewer.
     */
    clearActiveTopicMarkup(): Promise<void>;
    /**
     * Cancels the camera-change callback that automatically deactivates markup overlays
     * when the camera moves after topic activation.
     */
    clearTopicMarkupAutoDeactivate(): void;
}
