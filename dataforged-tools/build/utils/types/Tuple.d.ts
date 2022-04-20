/**
 * Represents a tuple: a typed array with a fixed length.
 * @public
 */
declare type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & {
    length: TLength;
};
export { Tuple };
//# sourceMappingURL=Tuple.d.ts.map