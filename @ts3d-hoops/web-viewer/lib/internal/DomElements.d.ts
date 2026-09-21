import { HtmlId } from '../types';
export declare class DomElements {
    private readonly _container;
    private readonly _canvasContainerElement;
    private readonly _markupSvgElement;
    private readonly _redlineSvgElement;
    private readonly _redlineElement;
    private constructor();
    getCanvasContainerElement(): HTMLDivElement;
    getMarkupSvgElement(): SVGSVGElement;
    getRedlineSvgElement(): SVGSVGElement;
    getRedlineElement(): HTMLDivElement;
    shutdown(): void;
    static create(containerOrId: HTMLElement | string): DomElements | null;
    static createFromElement(container: HTMLElement): DomElements;
    static createFromId(containerId: HtmlId): DomElements | null;
    private static _createSvgElement;
}
