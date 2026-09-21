import { AttributeType } from '../../../types';
import { UnitElement } from '@ts3d-hoops/common';
import { PhantomMember } from '../../types';
import { AssemblyDataParser } from '../load/AssemblyDataParser';
export declare class Attribute {
    static parseBinary(parser: AssemblyDataParser): Attribute;
    static parseXml(attributeNode: Element): Attribute;
    constructor(type: AttributeType, title: string, valueName: string | null, value: string, unit: UnitElement[]);
    getType(): AttributeType;
    getValueName(): string | null;
    getTitle(): string;
    getValue(): string;
    getUnit(): string;
    copy(): Attribute;
    protected readonly __Attribute: PhantomMember;
    private readonly _type;
    private readonly _valueName;
    private readonly _title;
    private readonly _value;
    private readonly _unit;
}
