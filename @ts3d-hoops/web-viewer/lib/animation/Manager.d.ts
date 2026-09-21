import { IWebViewer } from '../core/IWebViewer';
import { Animation } from './Animation';
import { Player } from './Player';
/** Top-level interface for the animation system. */
export declare class Manager {
    private _viewer;
    private _players;
    private _intervalHandle;
    private _batch;
    /** @hidden Created during IWebViewer Initialization. */
    constructor(_viewer: IWebViewer);
    /** Creates a new animation player for the supplied animation. */
    createPlayer(animation: Animation): Player;
    /** Removes the player at the provided index from control of the manager. Returns `true` if a player was removed */
    removePlayerByIndex(index: number): boolean;
    /** Removes the provided player from control of the manager. Returns `true` is a player was removed */
    removePlayer(player: Player): boolean;
    /** Removes all players from control of the manager. */
    clear(): void;
    private _tick;
    /** @hidden  Called by the web viewer only*/
    _shutdown(): void;
    /**
     * Sets the interval at which animations are updated.
     * @param milliseconds number of milliseconds between update intervals
     */
    setTickInterval(milliseconds: number): void;
}
