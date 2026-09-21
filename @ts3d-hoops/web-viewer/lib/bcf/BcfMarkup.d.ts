import { GenericId, Uuid } from '../types';
import { BCFTopic } from './BcfTopic';
import { BCFCommentId } from './types';
export declare class BCFMarkupHeaderFile {
    private _ifcProject;
    private _ifcSpatialStructureElement;
    private _isExternal;
    private _filename;
    private _date;
    private _reference;
    constructor(ifcProject: GenericId | undefined, ifcSpatialStructureElement: GenericId | undefined, isExternal: boolean | undefined, filename: string | undefined, date: Date | undefined, reference: string | undefined);
    /**
     * [[GenericId]] Reference to the project to which this topic is related in the IFC file
     */
    getIfcProject(): GenericId | null;
    /**
     * [[GenericId]] Reference to the spatial structure element, e.g. IfcBuildingStorey, to which this topic is related.
     */
    getIfcSpacialStructureElement(): GenericId | null;
    /**
     * Is the IFC file external or within the bcfzip
     */
    getIsExternal(): boolean | null;
    /**
     * The BIM file related to this topic.
     */
    getBimFilename(): string | null;
    /**
     * Date of the BIM file.
     */
    getBimDate(): Date | null;
    /**
     * URI to IfcFile.
     * IsExternal=false "..\example.ifc" (within bcfzip)
     * IsExternal=true "https://.../example.ifc"
     */
    getReference(): string | null;
}
export declare class BCFMarkupViewpoint {
    private readonly _guid;
    private readonly _viewpointFilename;
    private readonly _snapshotFilename;
    private readonly _index;
    constructor(guid: Uuid, viewpointFilename: string | undefined, snapshotFilename: string | undefined, index: string | undefined);
    getGuid(): Uuid;
    getViewpointFilename(): string | null;
    getSnapshotFilename(): string | null;
    getIndex(): number | null;
}
export declare class BCFComment {
    private readonly _guid;
    private _date;
    private _author;
    private _text;
    private _viewpointGuid?;
    private _modifiedDate?;
    private _modifiedAuthor?;
    constructor(guid: BCFCommentId, date: Date, author: string, text: string, viewpointGuid?: string, modifiedDate?: Date, modifiedAuthor?: string);
    getId(): BCFCommentId;
    getDate(): Date;
    setDate(date: Date): void;
    getAuthor(): string;
    setAuthor(author: string): void;
    getText(): string;
    setText(text: string): void;
    getViewpointGuid(): Uuid | null;
    setViewpointGuid(id: Uuid | null): void;
    getModifiedDate(): Date | null;
    setModifiedDate(date: Date | null): void;
    getModifiedAuthor(): string | null;
    setModifiedAuthor(author: string | null): void;
}
export declare class BCFMarkup {
    private readonly _bcfTopic;
    private readonly _filename;
    private _projectGuid;
    private _markupHeaderFiles;
    private _topic;
    private _comments;
    private _viewpoints;
    constructor(filename: string, document: Document | null, bcfTopic: BCFTopic);
    private _parseDocument;
    private _exportHeader;
    private _exportTopicData;
    private _exportBimSnippet;
    private _exportDocumentReference;
    private _exportRelatedTopic;
    private _exportTopic;
    private _exportComment;
    private _exportViewpoint;
    /**
     * @returns XML document containing the markup data.
     */
    export(): XMLDocument;
    /**
     * @returns the project GUID.
     */
    getProjectGuid(): Uuid | null;
    /**
     * @returns a list of [[BCFMarkupHeaderFile]] containing data related to IFC files.
     */
    getMarkupHeaderFiles(): BCFMarkupHeaderFile[];
    /**
     * Gets the Markup filename.
     */
    getFilename(): string;
    /**
     * Gets the topic id.
     */
    getTopicId(): Uuid;
    /**
     * Sets the topic id.
     * @param guid
     */
    setTopicId(guid: Uuid): void;
    /**
     * Gets the topic type.
     */
    getTopicType(): string | null;
    /**
     * Sets the topic type.
     * @param topicType
     */
    setTopicType(topicType: string | null): void;
    /**
     * Gets the topic status.
     */
    getTopicStatus(): string | null;
    /**
     * Sets the topic status.
     * @param topicStatus
     */
    setTopicStatus(topicStatus: string | null): void;
    /**
     * Gets the title of the markup topic.
     */
    getTopicTitle(): string;
    /**
     * Sets the title of the markup topic.
     * @param title
     */
    setTopicTitle(title: string): void;
    /**
     * Gets the creation date of the markup topic.
     */
    getTopicCreationDate(): Date;
    /**
     * Sets the creation date of the markup topic;
     * @param date
     */
    setTopicCreationDate(date: Date): void;
    /**
     * Gets the name of the user that created the markup topic.
     */
    getTopicCreationAuthor(): string;
    /**
     * Sets the name of the user that created the markup topic.
     * @param author
     */
    setTopicCreationAuthor(author: string): void;
    /**
     * List of references to the topic, for example, a work request management system or an URI to a model.
     */
    getTopicReferenceLink(): string | null;
    /**
     * Sets the ReferenceLink.
     * @param referenceLink
     */
    setTopicReferenceLink(referenceLink: string | null): void;
    /**
     * Gets the topic priority.
     */
    getTopicPriority(): string | null;
    /**
     * Sets the topic priority.
     * @param priority
     */
    setTopicPriority(priority: string | null): void;
    /**
     * Number to maintain the order of the topics.
     */
    getTopicIndex(): number | null;
    /**
     * Sets the topic index.
     * @param index
     */
    setTopicIndex(index: number | null): void;
    /**
     * Tags for grouping Topics.
     */
    getTopicLabels(): string[];
    /**
     * Sets the topic labels.
     * @param labels
     */
    setTopicLabels(labels: string[]): void;
    /**
     * Date when the topic was last modified. Exists only when Topic has been modified after creation.
     */
    getTopicModifiedDate(): Date | null;
    /**
     * Sets the topic modified date.
     * @param date
     */
    setTopicModifiedDate(date: Date | null): void;
    /**
     * User who modified the topic. Exists only when Topic has been modified after creation.
     */
    getTopicModifiedAuthor(): string | null;
    /**
     * Sets the author that last modified the topic.
     * @param modifiedAuthor
     */
    setTopicModifiedAuthor(modifiedAuthor: string | null): void;
    /**
     * Date when the issue needs to be resolved by.
     */
    getTopicDueDate(): Date | null;
    /**
     * Sets the topic due date.
     * @param date
     */
    setTopicDueDate(date: Date | null): void;
    /**
     * The user to whom this topic is assigned to. Recommended to be in email format. The list of possible values are defined in the extension schema.
     */
    getTopicAssignedTo(): string | null;
    /**
     * Sets the user that the topic is assigned to.
     */
    setTopicAssignedTo(assignedTo: string | null): void;
    /**
     * Description of the topic.
     */
    getTopicDescription(): string | null;
    /**
     * Sets the topic description;
     * @param description
     */
    setTopicDescription(description: string | null): void;
    /**
     * Stage this topic is part of.
     */
    getTopicStage(): string | null;
    /**
     * Sets the topic stage;
     * @param stage
     */
    setTopicState(stage: string | null): void;
    /**
     * Gets a map of GUIDs and corresponding comments.
     */
    getComments(): Map<Uuid, BCFComment>;
    /**
     * Adds a comment to the topic.
     * @param date
     * @param author
     * @param text
     * @param viewpointGuid
     * @param modifiedDate
     * @param modifiedAuthor
     */
    addComment(date: Date, author: string, text: string, viewpointGuid?: string, modifiedDate?: Date, modifiedAuthor?: string): BCFComment;
    /**
     * Updates a topic comment.
     * @param comment
     */
    updateComment(comment: BCFComment): void;
    /**
     * Deletes a comment from the topic..
     * @param guid
     */
    deleteComment(guid: Uuid): void;
    /**
     * Gets a map of GUIDs and corresponding viewpoints.
     */
    getViewpoints(): Map<Uuid, BCFMarkupViewpoint>;
    private _addFile;
    private _parseHeader;
    private _parseTopic;
    private _parseComment;
    private _parseViewpoint;
    addViewpoint(guid: Uuid, viewpointFilename?: string, snapshotFilename?: string, index?: string): void;
    private _getChildData;
    private _getElementAttributes;
}
