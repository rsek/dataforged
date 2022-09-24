import type { AttributeKey, AttributeMaster } from "../../schema_json";
/**
 * @alpha
 */
export declare type AttributeHash<K extends AttributeKey = AttributeKey> = {
    [key in K]?: AttributeMaster[K] | AttributeMaster[K][] | undefined | null;
};
//# sourceMappingURL=AttributeHash.d.ts.map