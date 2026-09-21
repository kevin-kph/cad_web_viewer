import { Button, KeyModifiers } from '../types';
/** @hidden */
export declare class ButtonModifier {
    private _button;
    private _modifier;
    constructor(button: Button, modifier: KeyModifiers);
    getButton(): Button;
    getModifier(): KeyModifiers;
}
