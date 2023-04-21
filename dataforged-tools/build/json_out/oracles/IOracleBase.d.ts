import type { IDisplayWithTitle, IHasAliases, IHasDescription, IHasDisplay, IHasId, IHasName, IHasOracleContent, IHasSource, IOracle, IOracleCategory, IOracleUsage } from "../index.js";
/**
 * Interface with elements common to various Oracle-related interfaces and classes.
 * @public
 */
export interface IOracleBase extends Partial<IHasAliases & IHasDescription & IHasOracleContent>, IHasId, IHasDisplay, IHasSource, IHasName {
    /**
     * The ID of the most recent OracleCategory ancestor of this item, if any.
     * @pattern ^(Ironsworn|Starforged)/Oracles/[A-z_-/]+$
     */
    Category?: IOracleCategory["$id"] | undefined;
    /**
     * Oracle objects contained by this object.
     */
    Oracles?: IOracle[] | undefined;
    /**
     * The ID of the most recent Oracle ancestor of this item, if any.
     * @pattern ^(Ironsworn|Starforged)/Oracles/[A-z_-]+/[A-z_-]+$
     */
    "Member of"?: IOracle["$id"] | undefined;
    Display: IDisplayWithTitle;
    /**
     * Information on the usage of this oracle: recommended number of rolls, etc.
     */
    Usage?: IOracleUsage | undefined;
}
//# sourceMappingURL=IOracleBase.d.ts.map