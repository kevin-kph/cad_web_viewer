/**
 * A bidirectional map.
 */
export declare class Bimap<Left, Right> {
    set(left: Left, right: Right): void;
    getLeft(right: Right): Left | undefined;
    getRight(left: Left): Right | undefined;
    private readonly _leftToRight;
    private readonly _rightToLeft;
}
