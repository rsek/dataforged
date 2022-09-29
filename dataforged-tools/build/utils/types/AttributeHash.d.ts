import type { AttributeKey, AttributeMaster } from "../../schema";
/**
 * @public
 */
export declare type AttributeMap<K extends AttributeKey = AttributeKey> = {
    [key in K]?: Array<AttributeMaster[K]> | undefined | null;
};
//# sourceMappingURL=AttributeHash.d.ts.map