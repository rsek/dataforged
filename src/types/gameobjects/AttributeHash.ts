import { getOptions } from "showdown";
import type { AttributeKey, AttributeValue } from "./IAttribute.js";

type AttributeHash = Record<AttributeKey, AttributeValue[] | AttributeValue | null>;

export default AttributeHash;