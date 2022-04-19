/**
 * Represents a tuple: a typed array with a fixed length.
 * @public
 */
type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & { length: TLength; }; export { Tuple };

