import type { AttributeKey, IAttribute } from "@dataforged/json_out/index.js";

export interface IAttributeChoices<T extends AttributeKey = AttributeKey> {
  Key: T;
  Values?: NonNullable<IAttribute<T>["Value"]>[] | undefined;
}
