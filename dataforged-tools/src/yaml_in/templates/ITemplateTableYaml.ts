import type { IRowContentYaml, IRowRollYaml } from "@yaml_in/index.js";
import type { IRowYaml } from "@yaml_in/oracles/IRowYaml.js";


/**
 * @internal
 */
export interface ITemplateTable {
  rolls: (IRowYaml | IRowRollYaml)[];
  content: (IRowYaml | IRowContentYaml | string)[];
}

