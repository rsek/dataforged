import type { IDisplayWithTitle, IHasAliases, IHasDescription, IHasDisplay, IHasId, IHasOracleContent, IHasOracleUsage, IHasSource, IOracle, IOracleContent, IOracleUsage } from "../index.js";
import type { IOracleCategory } from "./IOracleCategory.js";
/**
 * Interface with elements common to various Oracle-related interfaces and classes.
 * @public
 */
export interface IOracleBase extends Partial<IHasAliases & IHasDescription & IHasOracleContent<IOracleContent> & IHasOracleUsage<IOracleUsage>>, IHasId, IHasDisplay, IHasSource {
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
     * @pattern ^(Ironsworn|Starforged)/Oracles/[A-z_-]+/[A-z_-/]+$
     */
    "Member of"?: IOracle["$id"] | undefined;
    Display: IDisplayWithTitle;
}
//# sourceMappingURL=IOracleBase.d.ts.map