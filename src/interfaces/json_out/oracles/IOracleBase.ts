import type { IDisplay } from "@dataforged/interfaces/json_out/common/IDisplay.js";
import type { IHasAliases, IHasDescription, IHasDisplay, IHasId, IHasOracleContent, IHasOracleUsage, IHasSource } from "@dataforged/interfaces/json_out/common/IHas.js";
import type { OracleTableId } from "@dataforged/interfaces/json_out/index.js";
import type { IOracle } from "@dataforged/interfaces/json_out/oracles/IOracle.js";
import type { IOracleContent } from "@dataforged/interfaces/json_out/oracles/IOracleContent.js";
import type { IOracleUsage } from "@dataforged/interfaces/json_out/oracles/IOracleUsage.js";
import type { OracleCategoryId } from "@dataforged/interfaces/json_out/oracles/strings/OracleCategoryId.js";
/**
 * @internal
 */
export interface IOracleBase extends Partial<
    IHasAliases &
    IHasDescription &
    IHasOracleContent<IOracleContent> & IHasOracleUsage<IOracleUsage>
  >, IHasId<OracleTableId | OracleCategoryId>, IHasDisplay<IDisplay>,
  IHasSource  {
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
