"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OracleContent = void 0;
// import { badJsonError } from "@utils/logging/badJsonError.js";
/**
 * Metadata that describes an oracle's semantic or lexical content.
 * @internal
 */
class OracleContent {
    constructor(json) {
        var _a, _b;
        // if (!(json["Part of speech"]||json["Tags"])) {
        //   throw badJsonError(this.constructor, json, "Expected IOracleContent");
        // }
        this["Part of speech"] = (_a = json["Part of speech"]) !== null && _a !== void 0 ? _a : undefined;
        this["Tags"] = (_b = json["Tags"]) !== null && _b !== void 0 ? _b : undefined;
    }
}
exports.OracleContent = OracleContent;
//# sourceMappingURL=OracleContent.js.map