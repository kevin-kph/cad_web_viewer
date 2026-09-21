import { Attribute } from './types';
/**
 * Properties returned from Model's `getEdgeAttributes` and `getFaceAttributes` methods.
 */
export declare class SubentityAttributes {
    constructor(attributes: Attribute[]);
    copy(): SubentityAttributes;
    attributes: Attribute[];
}
