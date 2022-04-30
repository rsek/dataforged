import type { AttributeKey, IAttributeMaster } from "@json_out/index.js";
/**
 * @alpha
 */
export type AttributeHash<K extends AttributeKey = AttributeKey> = {
  [key in K]?: IAttributeMaster[K] | IAttributeMaster[K][] | undefined
};