import type { IHasAliases, IHasDescription, IHasDisplay, IHasId, IHasOracleContent, IHasSource, IHasSummary, IHasText, IHasTitle, IOracleDisplayBase, IOracleSet, IOracleTable, IOracleUsage, IRow, IRowNullStub } from "../index.js";
/**
 * @public
 */
export interface IOracleMatch extends IHasId, IHasText {
    /**
     * @pattern ^(Ironsworn|Starforged)/Oracles/[A-z_-]+((/[A-z_-]+)+)?/On_a_Match$
     */
    $id: string;
}
/**
 * Interface with elements common to various Oracle-related interfaces and classes.
 *
 * If you're trying to crawl the tree for a specific ID, I'd recommend using some flavour of JSONpath (I like `jsonpath-plus`) - it's purpose-made for this sort of nested data structure.
 *
 * But if for some reason you can't, you can use this interface to type both {@link IOracleTable} and {@link IOracleSet} as you recurse the oracle hierarchy. Objects with `Categories` and `Oracles` are "branches", and objects with `Table` are "leaves".
 * @public
 */
export interface IOracleBase extends Partial<IHasAliases & IHasSummary & IHasDescription & IHasOracleContent>, IHasId, IHasDisplay, IHasSource, IHasTitle {
    $id: string;
    /**
     * An array containing the ID of every {@link IOracleSet} ancestor of this item. The array is sorted from the most recent ancestor (e.g. one level up) to the most distant.
     * @pattern ^(Ironsworn|Starforged)/Oracles/[A-z_-/]+$
     */
    Ancestors: IOracleSet["$id"][];
    Display: IOracleDisplayBase;
    /**
     * Information on the usage of this oracle: recommended number of rolls, etc.
     */
    Usage?: IOracleUsage | undefined;
    /**
     * Represents a single oracle table, where 'table' is defined as being something with a single roll range.
     *
     * This key appears only on {@link IOracleSet}, and thus only on 'leaf' nodes of the oracle hierarchy 'tree'.
     */
    Table?: (IRow | IRowNullStub)[] | undefined;
    /**
     * Oracle tables contained by this set.
     *
     * This key appears only on {@link IOracleSet}, and thus only on 'branch' nodes of the oracle hierarchy 'tree'.
     */
    Tables?: IOracleTable[] | undefined;
    /**
     * Oracle sets contained by this set.
     *
     * This key appears only on {@link IOracleSet}, and thus only on 'branch' nodes of the oracle hierarchy 'tree'.
     */
    Sets?: IOracleSet[] | undefined;
    /**
     * Describes the match behaviour of this oracle's table, if any, and provides a `Text` string describing it. Only appears on a handful of move oracles like Ask the Oracle and Advance a Threat.
     *
     * This key appears only on {@link IOracleTable}s that have a `Table`.
     */
    "On a Match"?: IOracleMatch | undefined;
}
//# sourceMappingURL=IOracleBase.d.ts.map