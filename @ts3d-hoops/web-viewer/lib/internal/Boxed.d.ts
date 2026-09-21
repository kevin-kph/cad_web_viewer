import { PhantomMember } from './types';
export declare class Boxed<T> {
    static create<T>(value: T): Boxed<T>;
    constructor(value: T);
    protected readonly __Boxed: PhantomMember;
    readonly value: T;
}
