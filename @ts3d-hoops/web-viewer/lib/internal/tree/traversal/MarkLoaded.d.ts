import { AttachContext } from '../context/AttachContext';
import { LoadContext } from '../context/LoadContext';
export declare function markContextsLoaded(contexts: (LoadContext | AttachContext)[]): Promise<void>;
