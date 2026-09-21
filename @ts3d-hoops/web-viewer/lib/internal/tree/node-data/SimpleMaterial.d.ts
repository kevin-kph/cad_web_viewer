import { Color } from '@ts3d-hoops/common';
import { PhantomMember } from '../../types';
export declare class SimpleMaterial {
    static parseXml(elem: Element): SimpleMaterial;
    private constructor();
    getColor(): Color | null;
    getAlpha(): number | null;
    protected readonly __Material: PhantomMember;
    private readonly _color;
    private readonly _alpha;
}
