import { OperatorManager } from '../OperatorManager';
import { Button, Buttons, KeyModifiers } from '../types';
import { ViewKey } from '@ts3d-hoops/streamcache';
import { ICallbackManager } from '../core/ICallbackManager';
export declare class EventDispatcher {
    private _callbackManager;
    private _contextEventChecker;
    private _operatorManager;
    constructor(callbackManager: ICallbackManager, operatorManager: OperatorManager);
    injectMouseDownEvent(x: number, y: number, button: Button, buttons: Buttons, modifiers: KeyModifiers, viewKey: ViewKey): void;
    injectMouseMoveEvent(x: number, y: number, button: Button, buttons: Buttons, modifiers: KeyModifiers, viewKey: ViewKey): void;
    injectMouseUpEvent(x: number, y: number, button: Button, buttons: Buttons, modifiers: KeyModifiers, viewKey: ViewKey): void;
    injectMousewheelEvent(x: number, y: number, delta: number, buttons: Buttons, modifiers: KeyModifiers, viewKey: ViewKey): void;
    injectKeyDownEvent(keyCode: number, modifiers: KeyModifiers, viewKey: ViewKey): void;
    injectKeyUpEvent(keyCode: number, modifiers: KeyModifiers, viewKey: ViewKey): void;
    injectTouchStartEvent(identifier: number, x: number, y: number, buttons: Buttons, viewKey: ViewKey): void;
    injectTouchMoveEvent(identifier: number, x: number, y: number, buttons: Buttons, viewKey: ViewKey): void;
    injectTouchEndEvent(identifier: number, x: number, y: number, buttons: Buttons, viewKey: ViewKey): void;
    injectViewOrientationChangeEvent(_viewKey: ViewKey): void;
}
