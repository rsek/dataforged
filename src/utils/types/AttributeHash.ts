import type { AttributeKey, IAttributeMaster } from "@dataforged/json_out/index.js";

type AttributeHash<K extends AttributeKey = AttributeKey> = {
  [key in K]?: IAttributeMaster[K] | IAttributeMaster[K][] | undefined
};

export { AttributeHash };