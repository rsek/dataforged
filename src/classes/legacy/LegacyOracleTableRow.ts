import { IGameObject } from "../general/GameObject";
import { ISuggestions } from "../general/Suggestions";
import IMultipleRolls, { MultipleRolls } from "../oracles/MultipleRolls";
import { OracleTableId } from "../oracles/OracleId";
import { IOracleTableRow } from "../oracles/OracleTableRow";
import LegacyGameObject, { ILegacyGameObject } from "./LegacyGameObject";


export interface ILegacyOracleTableRow {
  Chance: number;
  Description: string;
  Details?: string | undefined;
  Assets?: string[] | undefined;
  Suggestions?: ISuggestions | undefined;
  "Oracle rolls"?: string[] | undefined;
  "Game objects"?: ILegacyGameObject[] | undefined;
  "Multiple rolls"?: IMultipleRolls | undefined;
}

export default class LegacyOracleTableRow implements ILegacyOracleTableRow {
  Chance: number;
  Description: string;
  Details?: string | undefined;
  Assets?: string[] | undefined;
  Suggestions?: ISuggestions | undefined;
  "Oracle rolls"?: OracleTableId[] | undefined;
  "Game objects"?: LegacyGameObject[] | undefined;
  "Multiple rolls"?: MultipleRolls | undefined;

  constructor(row: IOracleTableRow) {
    this.Chance = row.Ceiling;
    this.Description = row.Result;
    this.Details = row.Summary;
    this["Multiple rolls"] = row["Multiple rolls"];
    this.Suggestions = row.Suggestions;
    this["Oracle rolls"] = row["Oracle rolls"];
    this["Game objects"] = row["Game objects"]?.map(item => new LegacyGameObject(item));
  }
}