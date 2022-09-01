import type { IOracleDisplay as IOracleDisplay, ITableColumnRoll, ITableColumnText } from "@json_out/index.js";
import type { YamlStub } from "@yaml_in/index.js";


/**
 * @internal
 */
export interface ITableColumnTextYaml extends YamlStub<ITableColumnText, "Label" | "Key"|"Use content from"> { }

/**
 * @internal
 */
export interface ITableColumnRollYaml extends YamlStub<ITableColumnRoll, "Label"|"Use content from"> { }

/**
 * @internal
 */
export interface IOracleDisplayYaml extends YamlStub<IOracleDisplay, "", "Columns"> {
  Columns?: (ITableColumnTextYaml | ITableColumnRollYaml)[] | undefined;
}
