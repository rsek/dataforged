//License: MIT
import type { ITableColumnBase, ITableDisplayInfo, ITextColumn } from "@json_out/index.js";
import type { YamlStub } from "@yaml_in/index.js";

/**
 * @internal
 */
export interface ITableDisplayInfoYaml extends YamlStub<ITableDisplayInfo, "", "Result columns"|"Roll columns"> {
  "Result columns"?: YamlStub<ITextColumn, "Use content from"|"Label"|"Key">[] | undefined;
  "Roll columns"?: YamlStub<ITableColumnBase, "Use content from"|"Label">[] |undefined;
}