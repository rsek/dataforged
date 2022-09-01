import type { IOracleDisplay as IOracleDisplay, ITableColumnRoll, ITableColumnText } from "@json_out/index.js";
import type { YamlStub } from "@yaml_in/index.js";


/**
 * @internal
 */
export interface ITableColumnTextYaml extends YamlStub<ITableColumnText, "Label" | "Key"|"Content"> { }

/**
 * @internal
 */
export interface ITableColumnRollYaml extends YamlStub<ITableColumnRoll, "Label"|"Content"> { }

/**
 * @internal
 */
export interface IOracleDisplayYaml extends YamlStub<IOracleDisplay, "", "Columns"> {
  Columns?: (ITableColumnTextYaml | ITableColumnRollYaml)[] | undefined;
}
