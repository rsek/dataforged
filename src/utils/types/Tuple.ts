type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & { length: TLength; }; export default Tuple;

