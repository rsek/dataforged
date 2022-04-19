import type { IOracleContent, PartOfSpeechTag } from "../../json_out/index.js";
/**
 * Metadata that describes an oracle's semantic or lexical content.
 * @internal
 */
export declare class OracleContent implements IOracleContent {
    "Part of speech"?: PartOfSpeechTag[] | undefined;
    "Tags"?: string[] | undefined;
    constructor(json: IOracleContent);
}
//# sourceMappingURL=OracleContent.d.ts.map