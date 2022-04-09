import type { AttributeKey, AttributeValue } from "@json_out/index.js";

export interface IAttribute<T extends AttributeKey = AttributeKey> {
  Key: T;
  Value?: AttributeValue<this["Key"]> | undefined;
}

