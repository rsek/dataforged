import type { AttributeKey, AttributeValue } from "@dataforged/json_out/index.js";

type AttributeHash = Record<AttributeKey, AttributeValue[] | AttributeValue | null>;

export { AttributeHash };