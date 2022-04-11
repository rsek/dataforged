import type { IDisplay, IHasAliases, IHasDescription, IHasDisplay, IHasId, IHasOracleContent, IHasOracleUsage, IHasSource, IOracle, IOracleContent, IOracleUsage } from "../index.js";
import type { IOracleCategory } from "./IOracleCategory.js";
/**
 */
export interface IOracleBase extends Partial<IHasAliases & IHasDescription & IHasOracleContent<IOracleContent> & IHasOracleUsage<IOracleUsage>>, IHasId<string>, IHasDisplay<IDisplay>, IHasSource {
    /**
     * The ID of the most recent OracleCategory ancestor of this item, if any.
     */
    Category?: IOracleCategory["$id"] | undefined;
    /**
     * Oracle objects contained by this object.
     */
    Oracles?: IOracle[] | undefined;
    /**
     * The ID of the most recent Oracle ancestor of this item, if any.
     */
    "Member of"?: IOracle["$id"] | undefined;
}
//# sourceMappingURL=IOracleBase.d.ts.map