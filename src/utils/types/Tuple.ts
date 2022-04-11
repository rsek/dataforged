/**
 * Represents a tuple: a typed array with a fixed length.
 */
type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & { length: TLength; }; export { Tuple };

