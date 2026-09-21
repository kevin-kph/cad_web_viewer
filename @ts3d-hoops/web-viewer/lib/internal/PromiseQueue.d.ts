import { ScsBuffer } from '../types';
import { Lazy, LazyLike } from '../util';
import { OpenPromise } from '../util/promise/OpenPromise';
import { PriorityQueue } from './PriorityQueue';
import { Queue } from './Queue';
import { XmlAttachPriorityProxy, AttachPriorityManager } from './tree/load/AttachPriorityManager';
import { CompareGreater } from './types';
export declare class _DeferredPromise<T, U = null> {
    constructor(lazyPromise: Lazy<Promise<T>>, wrapperPromise: OpenPromise<T>, compareValue: U);
    kill(): void;
    cancel(cancelValue: T): void;
    fetch(onAlive: (lazyPromise: Lazy<Promise<T>>) => Promise<T>, onKilled: () => void): void;
    private _lazyPromise;
    private readonly _wrapperPromise;
    readonly compareValue: U | undefined;
}
export declare abstract class PromiseQueueImpl<T, U, DeferredContainer extends {
    length: number;
}> {
    protected constructor(maxActivePromises: number, emptyContainer: DeferredContainer, failureFailsAll: boolean);
    maxActivePromises(): number;
    activePromiseCount(): number;
    isIdle(): boolean;
    waitForIdle(): Promise<void>;
    killDeferred(): void;
    protected _push<S extends T>(lazyPromise: LazyLike<Promise<S>>, compareValue: U): Promise<S>;
    protected abstract _queue(promise: _DeferredPromise<T, U>): void;
    protected abstract _dequeue(): _DeferredPromise<T, U>;
    protected _resort(): void;
    protected _drainQueue(): _DeferredPromise<T, U>[];
    protected _deferPromise<S extends T>(lazyPromise: Lazy<Promise<S>>, compareValue: U): Promise<S>;
    private _immediatePromise;
    protected _fetchNext(): void;
    private _finalizePromise;
    protected readonly _deferredPromises: DeferredContainer;
    private readonly _failureFailsAll;
    private _failed;
    private _failureError;
    private readonly _maxActivePromises;
    private _activePromiseCount;
    private _idlePromise;
    protected _latestPromise: Promise<T | void>;
    protected _needsResorting: boolean;
}
export declare class PromiseQueue<T> extends PromiseQueueImpl<T, null, Queue<_DeferredPromise<T>>> {
    protected _queue(promise: _DeferredPromise<T>): void;
    protected _dequeue(): _DeferredPromise<T>;
    constructor(maxActivePromises: number, failureFailsAll: boolean);
    push<S extends T>(lazyPromise: LazyLike<Promise<S>>): Promise<S>;
    waitOnLatest(): Promise<void>;
}
export declare class PriorityPromiseQueue<T, U> extends PromiseQueueImpl<T, U, PriorityQueue<_DeferredPromise<T, U>>> {
    protected _queue(promise: _DeferredPromise<T, U>): void;
    protected _dequeue(): _DeferredPromise<T, U>;
    constructor(maxActivePromises: number, compare: CompareGreater<U>, failureFailsAll: boolean);
    push<S extends T>(lazyPromise: LazyLike<Promise<S>>, compareValue: U): Promise<S>;
    markDirty(): void;
}
/**
 *  A promise queue that will hold at most two promises - one active and one queued. If a new promise
 *  is queued via the push() call, and there is an existing queued promise, the existing
 *  queued promise is deleted in favor of the new one.
 *
 *  Useful when you need an operation to be synchronous, but you want to skip intervening calls. Handling
 *  a mouseMove event is a reasonable example - If 5 moves happen before you finish processing the
 *  the first, you may want to skip the middle ones and go right to the last one.
 */
export declare class SingleMostRecentPromiseQueue<T> extends PromiseQueue<T> {
    protected _queue(promise: _DeferredPromise<T>): void;
    constructor(failureFailsAll: boolean);
}
/**
 * This class is an extension of a promise queue that makes use of an AttachPriorityManager to manage the items in the queue.
 * Dependings on priorities, only a subset of the total items added will be dequeued for retrieval and atttachment.
 * It is possible that this queue may never fully empty if items do not not every have a projected size large enough to pass the cutoff test.
 */
export declare class StreamCutoffAttachQueue extends PriorityPromiseQueue<ScsBuffer | Response | null, XmlAttachPriorityProxy> {
    private _cutoffScale;
    private _attachPriorityManager;
    private _cutoffAttachments;
    constructor(cutoffScale: number, attachPriorityManager: AttachPriorityManager, maxActivePromises: number, compare: CompareGreater<XmlAttachPriorityProxy>, failureFailsAll: boolean);
    setCutoffScale(cutoffScale: number): void;
    cutoffEnabled(): boolean;
    isEmpty(): boolean;
    killDeferred(): void;
    private _getCutoffValue;
    push<S extends ScsBuffer | Response | null>(lazyPromise: LazyLike<Promise<S>>, compareValue: XmlAttachPriorityProxy): Promise<S>;
    protected _resort(): void;
    update(): void;
    private _refillQueue;
    private _updateDeferredPromiseArray;
}
