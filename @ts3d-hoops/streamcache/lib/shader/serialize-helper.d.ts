import { UniformDescription } from './types';
/**
 * Calculate the buffer size in bytes needed to serialize a single uniform.
 * Format: [nameLen:u32][name:utf8][typeLen:u32][type:utf8][arrayLength:u32][data...]
 */
export declare function getUniformBufferSize(name: string, description: UniformDescription): number;
/**
 * Calculate the total buffer size in bytes needed to serialize multiple uniforms.
 * Format: [count:u32] then for each uniform: [nameLen:u32][name:utf8][typeLen:u32][type:utf8][arrayLength:u32][data...]
 */
export declare function getUniformsBufferSize(uniforms: Record<string, UniformDescription>): number;
/**
 * Serialize multiple uniforms into a buffer.
 * Format: [count:u32] then for each uniform: the output of serializeUniform
 * @returns The allocated ArrayBuffer containing the serialized uniforms.
 */
export declare function serializeUniforms(uniforms: Record<string, UniformDescription>): ArrayBuffer;
export declare function serializeBooleans(booleans: boolean[], buffer: ArrayBuffer, offset: number): number;
export declare function serializeText(text: string, buffer: ArrayBuffer, offset: number): number;
export declare function getUniformArrayLength(description: UniformDescription): number;
export declare function serializeUniform(name: string, description: UniformDescription, buffer: ArrayBuffer, offset: number): number;
