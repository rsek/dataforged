import type IAttribute from "@dataforged/interfaces/json_out/common/IAttribute.js";

export default interface IAttributeChoices {
  Key: IAttribute["Key"];
  Values?: IAttribute["Value"][] | undefined;
}
