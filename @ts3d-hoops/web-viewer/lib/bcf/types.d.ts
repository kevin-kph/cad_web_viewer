import { Point3, Color } from '@ts3d-hoops/common';
import { Degrees, GenericId, NodeId, Uuid } from '../types';
export declare enum BCFVersion {
    Unknown = 0,
    v1_0 = 1,
    v2_0 = 2,
    v2_1 = 3
}
export declare enum BCFFileType {
    Unknown = 0,
    TopicFolder = 1,
    Version = 2,
    Markup = 3,
    Snapshot = 4,
    Viewpoint = 5,
    Schema = 6,
    Project = 7
}
export interface MarkupTopic {
    guid: Uuid;
    topicType?: string;
    topicStatus?: string;
    title: string;
    creationDate: Date;
    creationAuthor: string;
    referenceLink?: string;
    priority?: string;
    index?: number;
    labels?: string[];
    modifiedDate?: Date;
    modifiedAuthor?: string;
    dueDate?: Date;
    assignedTo?: string;
    description?: string;
    stage?: string;
    bimSnippets?: MarkupBimSnippet[];
    documentReferences?: MarkupDocumentReference[];
    relatedTopics?: MarkupRelatedTopic[];
}
export interface MarkupBimSnippet {
    snippetType: string;
    isExternal?: boolean;
    reference: string;
    referenceSchema?: string;
}
export interface MarkupDocumentReference {
    guid?: Uuid;
    isExternal?: boolean;
    referencedDocument?: string;
    description?: string;
}
export interface MarkupRelatedTopic {
    guid: Uuid;
}
export interface ViewSetupHints {
    spacesVisible: boolean;
    spaceBoundariesVisible: boolean;
    openingsVisible: boolean;
}
export interface Component {
    ifcGuid?: GenericId;
    originatingSystem?: string;
    authoringToolId?: NodeId;
}
export interface ArgbColor {
    alpha?: number;
    color: Color;
    components: Component[];
}
export interface ViewpointComponents {
    viewSetupHints?: ViewSetupHints;
    selection?: Component[];
    defaultVisibility?: boolean;
    visibilityExceptions?: Component[];
    coloring?: ArgbColor[];
}
export interface OrthogonalCamera {
    cameraViewPoint: Point3;
    cameraDirection: Point3;
    cameraUpVector: Point3;
    viewToWorldScale: number;
}
export interface PerspectiveCamera {
    cameraViewPoint: Point3;
    cameraDirection: Point3;
    cameraUpVector: Point3;
    fieldOfView: Degrees;
}
export interface Line {
    startPoint: Point3;
    endPoint: Point3;
}
export interface ClippingPlane {
    location: Point3;
    direction: Point3;
}
export interface BcfNode {
    genericId: string | null;
    nodeId: NodeId;
}
export type BCFName = string;
export type BCFViewpointName = string;
export type BCFMarkupName = string;
export type BCFTopicId = Uuid;
export type BCFCommentId = Uuid;
