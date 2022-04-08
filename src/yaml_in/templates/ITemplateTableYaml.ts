import type { IRowContentYaml, IRowRollYaml } from "@dataforged/yaml_in/index.js";
import type { IRowYaml } from "@dataforged/yaml_in/oracles/IRowYaml.js";


export interface ITemplateTable {
  rolls: (IRowYaml | IRowRollYaml)[];
  content: (IRowYaml | IRowContentYaml | string)[];
}

