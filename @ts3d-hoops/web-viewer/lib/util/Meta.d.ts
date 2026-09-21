/**
 * This purpose of this function is guarantee a value is of a given type.
 *
 * This is essentially a compile time `console.assert(x instanceof T)`.
 *
 * This function is useful when terminating a type-narrowing if-else chain in that
 * this function makes the code more robust to future type changes.
 *
 * ---
 *
 * Warning:
 *
 * `T=never` doesn't appear to work properly, hence the existence of `TypeAssertNever`.
 *
 * ---
 *
 * Example:
 * ```
 * declare const x: Foo | Bar;
 * if (x instanceof Foo) {
 *     console.log("foo");
 * }
 * else {
 *     // This becomes a compiler error if, for example, `x`'s type gets changed to add `Baz`:
 *     //    x: Foo | Bar | Baz
 *     TypeAssert<Bar>(x);
 *     console.log("bar");
 * }
 * ```
 */
export declare function TypeAssert<T>(_x: T): void;
/**
 * See `TypeAssert` for details.
 *
 * This is useful for making the compiler enforce fully-covered switch statements.
 *
 * This function unconditionally throws `InternalLogicError`.
 *
 * ---
 *
 * Example:
 * ```
 *  switch (x) {
 *      case Enum.A:
 *          break;
 *      case Enum.B:
 *          break;
 *      default:
 *          TypeAssertNever(x); // compiler complains if missing other enum cases
 *  }
 * ```
 *
 */
export declare function TypeAssertNever(_x: never): never;
