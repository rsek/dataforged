import type { IDisplay, IHasAliases, IHasDescription, IHasDisplay, IHasId, IHasOracleContent, IHasOracleUsage, IHasSource, IOracle, IOracleContent, IOracleUsage, OracleCategoryId, OracleTableId } from "../index.js";
export interface IOracleBase extends Partial<IHasAliases & IHasDescription & IHasOracleContent<IOracleContent> & IHasOracleUsage<IOracleUsage>>, IHasId<OracleTableId | OracleCategoryId>, IHasDisplay<IDisplay>, IHasSource {
    Category?: OracleCategoryId | undefined;
    Oracles?: IOracle[] | undefined;
    "Member of"?: OracleTableId | undefined;
}
//# sourceMappingURL=IOracleBase.d.ts.map