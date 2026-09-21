import { Color } from '@ts3d-hoops/common';
import { PhantomMember } from '../../types';
export declare class ColorTable {
    static parseXml(elem: Element): ColorTable;
    constructor(colors: Color[]);
    getColor(colorIndex: number): Color | null;
    protected readonly __ColorTable: PhantomMember;
    private readonly _colorTable;
}
