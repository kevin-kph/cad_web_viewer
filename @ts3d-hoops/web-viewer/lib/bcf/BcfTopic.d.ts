import { Box } from '@ts3d-hoops/common';
import { MarkupView } from '../markup';
import { BCFMarkup } from './BcfMarkup';
import { BCFSnapshot } from './BcfSnapshot';
import { BCFViewpoint } from './BcfViewpoint';
import { BCFName, BCFTopicId, BCFVersion } from './types';
import { IWebViewer } from '../core/IWebViewer';
/**
 * This class contains data corresponding to a BCF file topic.
 */
export declare class BCFTopic {
    private readonly _viewer;
    private readonly _topicId;
    private readonly _bcfDataId;
    private readonly _bcfFilename;
    private _markup;
    private _viewpointMap;
    private _snapshotMap;
    constructor(bcfDataId: number, bcfFilename: BCFName, topicId: BCFTopicId, viewer: IWebViewer);
    /**
     * Takes a MarkupView and creates a BCF Topic from it.
     * @param bcfDataId
     * @param bcfFilename
     * @param viewer
     * @param markupView
     * @param topicTitle
     */
    static createTopic(viewer: IWebViewer, bcfDataId: number, bcfFilename: BCFName, topicTitle: string, markupView?: MarkupView | null): Promise<BCFTopic>;
    /**
     * Gets the topic id corresponding to the BCF topic folder.
     */
    getTopicId(): BCFTopicId;
    /**
     * Adds a BCF markup.
     * @param filename BCF markup filename.
     * @param document BCF markup document.
     */
    addMarkup(filename: string, document: Document | null): BCFMarkup;
    /**
     * @returns BCF markup data.
     */
    getMarkup(): BCFMarkup;
    /**
     * Creates and adds BCF viewpoint.
     * @param filename viewpoint filename.
     * @param document Viewpoint document.
     * @param version Version of the BCF node.
     * @param modelBounding Viewpoint model bounding box.
     * @param modelUnits Units in which the viewpoint model is defined.
     */
    addViewpoint(filename: string, document: Document | null, version: BCFVersion, modelBounding: Box, modelUnits: number): BCFViewpoint;
    /**
     * Adds a BCF Viewpoint. If there is a already a viewpoint with the same filename, it will be replaced.
     * @param filename
     * @param viewpoint
     */
    setViewpoint(filename: string, viewpoint: BCFViewpoint): void;
    /**
     * @returns A map associating viewpoint filenames with viewpoint data.
     */
    getViewpointMap(): Map<string, BCFViewpoint>;
    /**
     * Gets viewpoint data.
     * @param filename viewpoint filename.
     */
    getViewpoint(filename: string): BCFViewpoint | null;
    /**
     * Creates and adds a Snapshot.
     * @param filename Snapshot filename.
     * @param png Image data.
     */
    addSnapshot(filename: string, png: Uint8Array): void;
    /**
     * Adds a BCF Snapshot. If there is already a snapshot with the smae filename, it will be replaced.
     * @param filename
     * @param snapshot
     */
    setSnapshot(filename: string, snapshot: BCFSnapshot): void;
    /**
     * @returns A map associating snapshot filenames with snapshot data.
     */
    getSnapshotMap(): Map<string, BCFSnapshot>;
    /**
     * Gets snapshot data.
     * @param filename snapshot or corresponding viewpoint filename
     */
    getSnapshot(filename: string): BCFSnapshot | null;
    private _massageSnapshotFilename;
}
