import { CompareGreater } from './types';
/**
     * Example:
    ```
    const q = new PriorityQueue<number>((x, y) => x < y);
    q.push(2);
    q.push(3);
    q.push(1);
    q.pop() === 1;
    q.pop() === 2;
    q.pop() === 3;
    ```
     *
     */
export declare class PriorityQueue<T> {
    constructor(comparator: CompareGreater<T>);
    clear(): void;
    get length(): number;
    peek(): T;
    push(value: T): void;
    pop(): T;
    replace(value: T): T;
    private _greater;
    private _swap;
    private _siftUp;
    private _siftDown;
    private readonly _heap;
    private readonly _comparator;
}
