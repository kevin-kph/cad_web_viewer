import { Ids } from '@ts3d-hoops/streamcache';
export declare class PendingRequest<T> {
    constructor(ids: Ids<number>);
    readonly ids: Ids<number>;
    readonly promise: import('../../util/promise/OpenPromise').OpenPromise<T>;
}
