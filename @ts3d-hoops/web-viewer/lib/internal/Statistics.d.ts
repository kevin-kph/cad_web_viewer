import { IWebViewer } from '../core/IWebViewer';
import { ICallbackManager } from '../core/ICallbackManager';
export declare class StatisticMap {
    total_element_count: number;
    total_triangle_count: number;
}
export declare class Statistics {
    private _viewer;
    private _callbackManager;
    private _statisticsDisplayHandle;
    private _statisticsDisplay;
    private _statistics;
    constructor(callbackManager: ICallbackManager, viewer: IWebViewer);
    update(): Promise<void>;
    isShown(): boolean;
    getStatistics(): StatisticMap;
    showDisplay(): Promise<void>;
    hideDisplay(): void;
}
