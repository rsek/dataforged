import { getOptions } from "showdown";
import { AttributeKey, AttributeValue } from "./IAttribute";

type AttributeHash = Record<AttributeKey, AttributeValue[] | AttributeValue | null>;

export default AttributeHash;