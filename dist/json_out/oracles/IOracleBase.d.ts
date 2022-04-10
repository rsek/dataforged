import type { IDisplay, IHasAliases, IHasDescription, IHasDisplay, IHasId, IHasOracleContent, IHasOracleUsage, IHasSource, IOracle, IOracleContent, IOracleUsage, OracleCategoryId, OracleTableId } from "../index.js";
/**
 * @internal
 */
export interface IOracleBase extends Partial<IHasAliases & IHasDescription & IHasOracleContent<IOracleContent> & IHasOracleUsage<IOracleUsage>>, IHasId<OracleTableId | OracleCategoryId>, IHasDisplay<IDisplay>, IHasSource {
    /**
     * The ID of the most recent OracleCategory ancestor of this item, if any.
     */
    Category?: OracleCategoryId | undefined;
    /**
     * Oracle objects contained by this object.
     */
    Oracles?: IOracle[] | undefined;
    /**
     * The ID of the most recent Oracle ancestor of this item, if any.
     */
    "Member of"?: OracleTableId | undefined;
}
//# sourceMappingURL=IOracleBase.d.ts.map