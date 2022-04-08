import type { IDisplay } from "@dataforged/interfaces/json_out/common/IDisplay.js";
import type { IHasAliases, IHasDescription, IHasDisplay, IHasId, IHasOracleContent, IHasOracleUsage, IHasSource } from "@dataforged/interfaces/json_out/common/IHas.js";
import type { IOracle } from "@dataforged/interfaces/json_out/oracles/IOracle.js";
import type { IOracleContent } from "@dataforged/interfaces/json_out/oracles/IOracleContent.js";
import type { IOracleUsage } from "@dataforged/interfaces/json_out/oracles/IOracleUsage.js";
import type { OracleCategoryId } from "@dataforged/strings/id/OracleCategoryId.js";
import type { OracleTableId } from "@dataforged/strings/id/OracleTableId.js";
/**
 * @internal
 */
export interface IOracleBase extends Partial<
    IHasAliases &
    IHasDescription &
    IHasOracleContent<IOracleContent> & IHasOracleUsage<IOracleUsage>
  >, IHasId<OracleTableId | OracleCategoryId>, IHasDisplay<IDisplay>,
  IHasSource  {
  Category?: OracleCategoryId | undefined;
  Oracles?: IOracle[] | undefined;
  "Member of"?: OracleTableId | undefined;
}
