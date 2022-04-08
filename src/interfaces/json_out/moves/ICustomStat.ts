import type { ICustomStatOption } from "@dataforged/interfaces/json_out/assets/ICustomStatOption.js";


export interface ICustomStat {
  Name: string; // "Challenge Rank", etc - handle as type?
  Options: ICustomStatOption[];
}
