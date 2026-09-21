import { SnapshotConfig } from '../SnapshotConfig';
import { DomElements } from './DomElements';
export declare class Snapshot {
    private readonly _domElements;
    private readonly _config;
    constructor(domElements: DomElements, config: SnapshotConfig);
    static copySvgAsCanvas(svgElm: SVGSVGElement, width: number, height: number): Promise<HTMLCanvasElement>;
    private _extractRedlineAsCanvas;
    capture(mainCanvasContainer: HTMLDivElement): Promise<HTMLImageElement>;
}
