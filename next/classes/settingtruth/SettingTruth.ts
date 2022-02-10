import { ISource } from "../general/Source";
import { IOracleTableRow } from "../oracles/OracleTableRow";

export interface ISettingTruth {
  Name: string;
  Table: ISettingTruthTableRow[];
  Character: string;
  Source?: ISource;
}

export interface ISettingTruthTableRow extends IOracleTableRow {
  "Quest Starter": string;
}