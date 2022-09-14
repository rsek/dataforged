import type { IOracleDisplayBase, IOracleTableDisplay as IOracleTableDisplay, ITableColumnRoll, ITableColumnText } from "@json_out/index.js";
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
export interface IOracleDisplayBaseYaml extends YamlStub<IOracleDisplayBase, "", "Columns"> {
  Columns?: (ITableColumnTextYaml | ITableColumnRollYaml)[] | undefined;
}


/**
 * @internal
 */
export interface IOracleTableDisplayYaml extends IOracleDisplayBaseYaml {
}

/**
 * @internal
 */
export interface IOracleSetDisplayYaml extends Omit<IOracleDisplayBaseYaml, "Column of"|"Embed in">  {
}