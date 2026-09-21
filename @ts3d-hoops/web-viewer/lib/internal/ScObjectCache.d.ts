import { MatrixInc } from '@ts3d-hoops/streamcache';
import { IScEngine } from '../core/IScEngine';
export declare class ScMatrixCache {
    private readonly _engine;
    private _identityInc;
    constructor(engine: IScEngine);
    getIdentityInc(): MatrixInc;
    init(): Promise<void>;
}
