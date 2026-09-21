/**
 * This function behaves like writing [[Promise.all(promises).then(no_op)]] but does not incur the overhead of creating a [[.then]] promise.
 * Using this function can provide a performance boost when doing large amounts of batch processing with groups of promises.
 * @param promises array of promises.
 */
export declare function waitForAll(promises: Promise<void>[]): Promise<void>;
