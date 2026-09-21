import { PhantomMember } from '../../types';
export declare class Style {
    static parseXml(elem: Element): Style;
    private constructor();
    getMaterialIndex(): number | null;
    getColorIndex(): number | null;
    protected readonly __Style: PhantomMember;
    private readonly _materialIndex;
    private readonly _colorIndex;
}
