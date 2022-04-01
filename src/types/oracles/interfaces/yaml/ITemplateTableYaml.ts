import type { IRowContentYaml, IRowRollYaml } from "./IRowYaml.js";
import type IRowYaml from "./IRowYaml.js";

export default interface ITemplateTable {
  rolls: (IRowYaml | IRowRollYaml)[];
  content: (IRowYaml | IRowContentYaml | string)[];
}

