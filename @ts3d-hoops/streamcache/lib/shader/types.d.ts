import { ImageId } from '../keys';
/**
 * Supported GLSL uniform type names for shader uniforms.
 */
export declare const UniformTypeNames: readonly ["bool", "int", "uint", "float", "bvec2", "bvec3", "bvec4", "ivec2", "ivec3", "ivec4", "uvec2", "uvec3", "uvec4", "vec2", "vec3", "vec4", "mat2", "mat3", "mat4", "texture2D"];
/**
 * Union type of all supported GLSL uniform type names.
 */
export type UniformTypeName = (typeof UniformTypeNames)[number];
export declare const TextureWrapModeNames: readonly ["REPEAT", "MIRRORED_REPEAT", "CLAMP_TO_EDGE"];
export type TextureWrapModeName = (typeof TextureWrapModeNames)[number];
export declare const TextureFilterModeNames: readonly ["NEAREST", "LINEAR", "NEAREST_MIPMAP_NEAREST", "LINEAR_MIPMAP_NEAREST", "NEAREST_MIPMAP_LINEAR", "LINEAR_MIPMAP_LINEAR"];
export type TextureFilterModeName = (typeof TextureFilterModeNames)[number];
export type TextureDescriptionValue = {
    imageId: ImageId;
    wrapS: TextureWrapModeName;
    wrapT: TextureWrapModeName;
    minFilter: TextureFilterModeName;
    magFilter: TextureFilterModeName;
};
/**
 * Discriminated union type describing a shader uniform variable with its type and value(s).
 * Supports scalar values, vectors, matrices, and texture samplers as single values or arrays.
 */
export type UniformDescription = ({
    type: UniformTypeName;
} & {
    values: boolean;
    type: 'bool';
    isArray?: false;
}) | {
    values: boolean[];
    type: 'bool';
    isArray: true;
} | {
    values: boolean[];
    type: 'bvec2' | 'bvec3' | 'bvec4';
    isArray?: boolean;
} | {
    values: number;
    type: 'int' | 'uint' | 'float';
    isArray?: false;
} | {
    values: number[];
    type: 'int' | 'uint' | 'float';
    isArray: true;
} | {
    values: number[];
    type: 'vec2' | 'vec3' | 'vec4' | 'ivec2' | 'ivec3' | 'ivec4' | 'uvec2' | 'uvec3' | 'uvec4' | 'mat2' | 'mat3' | 'mat4';
    isArray?: boolean;
} | {
    values: TextureDescriptionValue;
    type: 'texture2D';
    isArray?: false;
};
/**
 * Configuration options for setting custom shaders on model parts.
 */
export interface SetShaderOptions {
    /**
     * Map of uniform variable names to their descriptions containing type and value information.
     */
    uniforms?: Record<string, UniformDescription>;
}
/**
 * Internal payload structure for shader options after serialization.
 * @internal
 */
export interface SetShaderOptionsPayload {
    /**
     * Serialized binary representation of uniform data.
     */
    uniforms?: ArrayBuffer;
}
