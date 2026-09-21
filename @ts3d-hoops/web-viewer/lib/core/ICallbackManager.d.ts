import { CallbackMap } from '../CallbackMap';
export interface ICallbackManager {
    bind(callbackMap: CallbackMap, highPriority?: boolean): void;
    promiseTrigger(name: keyof CallbackMap, delegate: keyof CallbackMap | null, ...args: any[]): Promise<void>;
    trigger(name: keyof CallbackMap, ...args: any[]): void;
    unbind(callbackMap: CallbackMap): void;
    unsafeTrigger(eventName: keyof CallbackMap, args?: any[]): void;
}
