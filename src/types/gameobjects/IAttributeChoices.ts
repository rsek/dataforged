import type IAttribute from "./IAttribute.js";

export default interface IAttributeChoices {
  Key: IAttribute["Key"];
  Values?: IAttribute["Value"][] | undefined;
}
