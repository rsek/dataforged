import type { AttributeKey, AttributeValue } from "@dataforged/interfaces/json_out/common/IAttribute.js";

type AttributeHash = Record<AttributeKey, AttributeValue[] | AttributeValue | null>;

export default AttributeHash;