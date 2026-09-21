import { Operators } from '@ts3d-hoops/web-viewer';
import { ISpaceMouseService } from './types';
export default class SpaceMouseService extends EventTarget implements ISpaceMouseService {
    readonly serviceName: "SpaceMouseService";
    private _spaceMouseOperator?;
    get spaceMouseOperator(): Operators.SpaceMouseOperator | undefined;
    set spaceMouseOperator(spaceMouseOperator: Operators.SpaceMouseOperator | undefined);
    connect(): void;
}
