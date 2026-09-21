import { Point2 } from '@ts3d-hoops/common';
import { MarkupRenderer } from './MarkupRenderer';
import { IView } from '../core/IView';
import { Uuid } from '../types';
/**
 * This is a base class for all markup items that are overlayed over the viewer.
 * Inherit from this class or provide an identical interface when creating custom markup items.
 */
export declare class MarkupItem {
    uniqueId: Uuid;
    /**
     * Called when the MarkupItem is removed from a view from the system.
     * Any cleanup that needs to be done should be performed in this method.
     * @param _view the view to remove from, null if removed from everywhere.
     */
    remove(_view: IView | null): void;
    /**
     * Called when the markup item should be redrawn on a specific view. This most typically happens when the scene is rendered.
     * @param _renderer renderer engine to draw.
     * @param _view the view to draw on.
     */
    draw(_renderer: MarkupRenderer, _view: IView): void;
    /**
     * Called when a hit test is performed on this markup item.
     * @param _point position in window where the hit test is being performed.
     * @param _view the projection where the hit test occurred.
     * @returns boolean value indicating whether this item was picked
     */
    hit(_point: Point2, _view: IView): boolean;
    /**
     * Called when a hit test is performed on this markup item.
     * @param _point position in window where the hit test is being performed.
     * @param _view the projection where the hit test occurred.
     * @param _pickTolerance amount of tolerance allowed for a hit in pixels.
     * @returns boolean value indicating whether this item was picked
     */
    hitWithTolerance(_point: Point2, _view: IView, _pickTolerance: number): boolean;
    /**
     * Called when this markup item is selected by the system from a given view.
     * @param _view the view where the selection occurred
     */
    onSelect(_view: IView): void;
    /**
     * Called when this markup item is deselected by the system
     */
    onDeselect(): void;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): object;
    /**
     * Gets the fully qualified class name for this markup item. E.g. "Communicator.Markup.Redline.RedlineCircle"
     * @returns fully qualified class name
     */
    getClassName(): string;
    /** @hidden */
    protected _behindView: boolean;
}
