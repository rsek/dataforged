import type { AttributeKey, AttributeMaster } from "../../schema";
/**
 * @alpha
 */
export declare type AttributeHash<K extends AttributeKey = AttributeKey> = {
    [key in K]?: AttributeMaster[K] | AttributeMaster[K][] | undefined | null;
};
//# sourceMappingURL=AttributeHash.d.ts.map