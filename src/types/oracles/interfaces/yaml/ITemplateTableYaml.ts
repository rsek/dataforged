import IRowYaml, { IRowContentYaml, IRowRollYaml } from "./IRowYaml";

export default interface ITemplateTable {
  rolls: (IRowYaml | IRowRollYaml)[];
  content: (IRowYaml | IRowContentYaml | string)[];
}

