import { NodeIdOffset } from '../types';
import { NodeChannel, CameraChannel } from './Channel';
import { BatchedValues } from './Values';
import { Animation } from './Animation';
import { IWebViewer } from '../core/IWebViewer';
export declare enum PlayerState {
    Stopped = 0,
    Playing = 1,
    Paused = 2,
    Complete = 3
}
export declare class Player {
    private readonly _viewer;
    /** The animation played by this player */
    readonly animation: Animation;
    /** If loop is set to LoopIndefinitely, the animation will play repeatedly. */
    static readonly LoopIndefinitely = -1;
    private readonly _nodeValues;
    private readonly _disabledChannels;
    /** The current time in seconds that the animation has been running. */
    private _currentTime;
    /** The time of the last update. */
    private _lastUpdate;
    /** Scale value to be applied to animation time. */
    speed: number;
    /** The total calculated time of the animation. */
    private _animationTime;
    private _state;
    /** The number of times the animation will repeat. Set to [[LoopIndefinitely]] to repeat indefinitely. Default is 0 */
    loop: number;
    /** The number of times the animation has repeated. */
    private _loopCount;
    /** Callback function to be called when the animation is complete.  Will not be triggered if the player is looping. */
    onComplete: (() => void) | null;
    /** A base offset value which will be applied to all node identifiers in the animation attached to this player.
     * This is useful to play an authored animation for a model that has been loaded into the scene after initial startup.
     * In this situation the authored node identifiers in the animation may not match up with the runtime node identifiers in the current scene.
     * The [[Model.getNodeIdOffset]] function can be used on the loaded model's root node to retrieve the correct offset value.
     * */
    nodeIdOffset: NodeIdOffset;
    /** @hidden Do not use.  Create via Animation.Manager API instead. */
    constructor(_viewer: IWebViewer, 
    /** The animation played by this player */
    animation: Animation);
    /** Sets the enabled state for a channel in this players animation.
     * All channels are enabled by default when a player is created.
     * A channel that has been disabled will not have its value interpolated by the system until it is re-enabled
     * @param channel a channel from the underlying animation
     * @param enabled boolean value indicating whether the channel should be enabled.
     */
    setChannelEnabled(channel: NodeChannel | CameraChannel, enabled: boolean): void;
    /**
     * Updates internal state of animation player.
     *
     * Call this method after any part of the underlying animation has been updated.
     * */
    reload(): void;
    /**
     * Called automatically by the Animation.Manager when it is updating all animations.
     * @returns True if values were modified.
     * @hidden
     */
    _tick(now: number, batch: BatchedValues): boolean;
    /**
     * Updates the animation using the supplied delta time specified in seconds.
     * @returns True if values were modified.
     * @hidden
     */
    private _tickTime;
    /** Starts playing the animation. */
    play(): void;
    /** Pauses animation playback. */
    pause(): void;
    /** Stops animation playback and resets the current time to 0. */
    stop(): void;
    /**
     * Sets the current animation time.
     * @param time time in milliseconds
     */
    setTime(time: number): void;
    /**
     * Calculate the values for each channel of the associated [[Animation]]
     * at the given time.
     *
     * @param time The time at which to evaluate the animation.
     * @param out Storage for the evaluated values. If supplied, this object
     * will be returned instead of a new [[BatchedValues]] object. This
     * allows values gathered from multiple players to be combined into one
     * batch.
     */
    evaluate(time: number, out?: BatchedValues): BatchedValues;
    /** Gets the current animation state. */
    getState(): PlayerState;
    /** Gets the current time in seconds that the animation has been playing. */
    getCurrentTime(): number;
    /** Gets the current time in seconds of the entire animation. */
    getAnimationTime(): number;
}
