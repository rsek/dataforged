import type { IAttribute } from "@dataforged/json_out/index.js";

export interface IAttributeChoices {
  Key: IAttribute["Key"];
  Values?: IAttribute["Value"][] | undefined;
}
