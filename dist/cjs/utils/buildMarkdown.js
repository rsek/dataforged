"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMarkdown = void 0;
const index_js_1 = require("../constants/index.js");
const buildMoveMarkdown_js_1 = require("./buildMoveMarkdown.js");
const buildOracleMarkdown_js_1 = require("./buildOracleMarkdown.js");
/**
 * Builds markdown from a Dataforged json object.
 * @param json The root json object to build from.
 * @param mdPath The root directory to render the markdown to.
 */
function buildMarkdown(json, mdPath = index_js_1.MD_PATH) {
    (0, buildOracleMarkdown_js_1.buildOracleMarkdown)(json.oracles, mdPath);
    (0, buildMoveMarkdown_js_1.buildMoveMarkdown)(json.moves, mdPath);
}
exports.buildMarkdown = buildMarkdown;
//# sourceMappingURL=buildMarkdown.js.map