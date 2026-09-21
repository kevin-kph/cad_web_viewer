export declare enum Key {
    Invalid = 4294967295
}
export declare enum MasterModelKey {
    Invalid = 4294967295,
    Local = 0
}
export declare enum CuttingSectionKey {
    Invalid = 4294967295
}
export declare enum DataKey {
    Invalid = 4294967295
}
export declare enum GroupKey {
    Invalid = 4294967295
}
export declare enum ImageKey {
    Invalid = 4294967295
}
export declare enum InclusionKey {
    Invalid = 4294967295,
    Local = 0
}
export declare enum InstanceKey {
    Invalid = 4294967295
}
export declare enum LightKey {
    Invalid = 4294967295
}
export declare enum MatrixKey {
    Invalid = 4294967295
}
export declare enum MeshKey {
    Invalid = 4294967295
}
export declare enum ModelKey {
    Invalid = 4294967295,
    Empty = 4294967294,
    Local = 0
}
export type Id<Key> = [ModelKey, Key];
export type CuttingSectionId = Id<CuttingSectionKey>;
export type DataId = Id<DataKey>;
export type GroupId = Id<GroupKey>;
export type ImageId = Id<ImageKey>;
export type InclusionId = Id<InclusionKey>;
export type InstanceId = Id<InstanceKey>;
export type MatrixId = Id<MatrixKey>;
export type MeshId = Id<MeshKey>;
export type ModelId = Id<ModelKey>;
export type Inc<Key> = [InclusionKey, Key];
export type CuttingSectionInc = Inc<CuttingSectionKey>;
export type DataInc = Inc<DataKey>;
export type GroupInc = Inc<GroupKey>;
export type ImageInc = Inc<ImageKey>;
export type InclusionInc = Inc<InclusionKey>;
export type InstanceInc = Inc<InstanceKey>;
export type MatrixInc = Inc<MatrixKey>;
export type MeshInc = Inc<MeshKey>;
export type ModelInc = Inc<ModelKey>;
export type Ids<Key> = (ModelKey | Key)[];
export type CuttingSectionIds = Ids<CuttingSectionKey>;
export type DataIds = Ids<DataKey>;
export type GroupIds = Ids<GroupKey>;
export type ImageIds = Ids<ImageKey>;
export type InclusionIds = Ids<InclusionKey>;
export type InstanceIds = Ids<InstanceKey>;
export type MatrixIds = Ids<MatrixKey>;
export type MeshIds = Ids<MeshKey>;
export type ModelIds = Ids<ModelKey>;
export type Incs<Key> = (InclusionKey | Key)[];
export type CuttingSectionIncs = Incs<CuttingSectionKey>;
export type DataIncs = Incs<DataKey>;
export type GroupIncs = Incs<GroupKey>;
export type ImageIncs = Incs<ImageKey>;
export type InclusionIncs = Incs<InclusionKey>;
export type InstanceIncs = Incs<InstanceKey>;
export type MatrixIncs = Incs<MatrixKey>;
export type MeshIncs = Incs<MeshKey>;
export type ModelIncs = Incs<ModelKey>;
