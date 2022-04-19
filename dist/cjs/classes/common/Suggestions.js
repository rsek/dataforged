"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Suggestions = void 0;
const index_js_1 = require("../index.js");
/**
 * @internal
 */
class Suggestions {
    constructor(data) {
        if (data["Game objects"]) {
            // console.info("[Suggestions] Game objects", JSON.stringify(data["Game objects"]));
            this["Game objects"] = data["Game objects"].map(gameObjData => new index_js_1.GameObject(gameObjData));
        }
        if (data["Oracle rolls"]) {
            // TODO type check against string
            this["Oracle rolls"] = data["Oracle rolls"];
        }
        if (data.Moves) {
            // TODO type check against string
            this.Moves = data.Moves;
        }
        if (data.Assets) {
            // TODO type check against string
            this.Assets = data.Assets;
        }
    }
}
exports.Suggestions = Suggestions;
//# sourceMappingURL=Suggestions.js.map