import type { IRowContentYaml, IRowRollYaml } from "@dataforged/interfaces/yaml_in/oracles/IRowYaml.js";
import type IRowYaml from "@dataforged/interfaces/yaml_in/oracles/IRowYaml.js";

export default interface ITemplateTable {
  rolls: (IRowYaml | IRowRollYaml)[];
  content: (IRowYaml | IRowContentYaml | string)[];
}

