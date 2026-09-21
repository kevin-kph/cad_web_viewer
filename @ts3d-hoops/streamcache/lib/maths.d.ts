import { Matrix16 } from '@ts3d-hoops/common';
import { MatrixInc, MatrixIncs } from './keys';
export interface MatrixInterface {
    create(elements?: Matrix16): Promise<MatrixInc>;
    destroy(incs: MatrixIncs): Promise<void>;
    getElements(incs: MatrixIncs): Promise<Matrix16[]>;
    setElements(incs: MatrixIncs, matrix: Matrix16): Promise<void>;
}
