import type { IAttribute } from "@dataforged/interfaces/json_out/oracles/IAttribute.js";

export interface IAttributeChoices {
  Key: IAttribute["Key"];
  Values?: IAttribute["Value"][] | undefined;
}
