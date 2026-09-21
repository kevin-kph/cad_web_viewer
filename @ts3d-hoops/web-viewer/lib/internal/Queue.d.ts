export declare class Queue<T> {
    constructor();
    clear(): void;
    get length(): number;
    push(x: T): void;
    pop(): T;
    private _head;
    private _tail;
    private _size;
}
