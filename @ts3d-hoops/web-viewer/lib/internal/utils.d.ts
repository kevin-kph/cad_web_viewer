import { Ray, Point3, IRay as ScRay, FaceFaceDistanceObject } from '@ts3d-hoops/common';
import { FaceFaceDistanceItem } from '../types';
import { NumberMap, StringMap } from './types';
export declare function toScRay(ray: Ray): ScRay;
export declare function makeFaceFaceDistanceItem(f: FaceFaceDistanceObject): FaceFaceDistanceItem;
export declare function hasBits(storedBits: number, desiredBits: number): boolean;
export declare function setBit(mask: number, bit: number, turnOn: boolean): number;
export declare function arrayBufferToBase64(buffer: Uint8Array): string;
export declare function projectOnto(source: Point3, target: Point3): Point3;
export declare function majorAxis(p: Point3): Point3 | null;
export declare function deepClone<T>(obj: T): T;
export declare function copyOwnProperties<T>(from: T, to: T): void;
export declare function getWithDefault<T>(maybeValue: T | undefined, defaultValue: T): T;
export type VersionNumber = number[];
export declare function versionAtLeast(version: VersionNumber, atLeast: VersionNumber): boolean;
export declare function versionString(version: VersionNumber): string;
export declare function getCrypto(): Crypto;
export declare const Subscript1 = "\u00B9";
export declare const Subscript2 = "\u00B2";
export declare const Subscript3 = "\u00B3";
export declare const SubscriptNeg = "\u207B";
export declare const Ohm = "\u2126";
/**
 * Uses `parseInt()` to work around bugs on Internet Explorer when
 * negative integers from different sources are used as keys.
 */
export declare function fromIntegerMap<K extends number, V>(obj: NumberMap<V> | Map<K, V>): Map<K, V>;
export declare function toIntegerMap<K extends number, V>(map: NumberMap<V> | Map<K, V>): NumberMap<V>;
/**
 * Uses `Number()`. May lead to bugs on Internet Explorer when
 * negative integers from different sources are used as keys.
 */
export declare function fromRealNumberMap<K extends number, V>(obj: NumberMap<V> | Map<K, V>): Map<K, V>;
export declare function fromStringMap<K extends string, V>(obj: StringMap<V> | Map<K, V>): Map<K, V>;
export declare function registerObjectFactory(className: string, factory: (flyWeight: object, ...args: any[]) => any): void;
export declare function getObjectFactory<T = any>(className: string): ((flyWeight: object, ...args: any[]) => T) | undefined;
