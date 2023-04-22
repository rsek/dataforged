// import { badJsonError } from "@utils/logging/badJsonError.js";
/**
 * Metadata that describes an oracle's semantic or lexical content.
 * @internal
 */
export class OracleContent {
    "Part of speech";
    "Tags";
    constructor(json) {
        // if (!(json["Part of speech"]||json["Tags"])) {
        //   throw badJsonError(this.constructor, json, "Expected IOracleContent");
        // }
        this["Part of speech"] = json["Part of speech"] ?? undefined;
        this["Tags"] = json["Tags"] ?? undefined;
    }
}
//# sourceMappingURL=OracleContent.js.map