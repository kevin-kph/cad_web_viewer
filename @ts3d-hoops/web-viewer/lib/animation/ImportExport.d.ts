import { ColorMap } from './Channel';
import { KeyframeBuffer } from './KeyframeBuffer';
import { Sampler } from './Sampler';
import { Animation } from './Animation';
/**
 * Return the given animations and their dependent data in a form suitable
 * for serialization via, e.g., `JSON.stringify`. The animation objects can
 * be recreated by passing the output to [[importAnimations]].
 *
 * Sharing of objects such as keyframe buffers and samplers is preserved.
 *
 * The layout of the returned data is subject to change in future releases.
 */
export declare function exportAnimations(animations: Animation[]): object;
/**
 * Recreate [[Animation]] objects exported by a call to
 * [[exportAnimations]].
 */
export declare function importAnimations(exportedObj: object): Animation[];
export declare class ExportContext {
    readonly buffers: IndexedSet<KeyframeBuffer>;
    readonly samplers: IndexedSet<Sampler>;
    readonly colorMaps: IndexedSet<ColorMap>;
}
export declare class ImportContext {
    readonly buffers: KeyframeBuffer[];
    readonly samplers: Sampler[];
    readonly colorMaps: ColorMap[];
}
/**
 * Provides the functionality of a `Set` with the addition of a
 * monotonically-increasing index associated with each element.
 */
export declare class IndexedSet<T> {
    private readonly map;
    add(value: T): void;
    getIndex(value: T): number;
    /**
     * Returns an array containing each element of the set placed at its
     * assigned index.
     */
    toArray(): T[];
    isEmpty(): boolean;
}
