"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOracleMarkdown = void 0;
const renderOracleCategory_js_1 = require("./md/renderOracleCategory.js");
const transformHyperlink_js_1 = require("./md/transformHyperlink.js");
const lodash_es_1 = __importDefault(require("lodash-es"));
const fs_1 = require("fs");
/**
 * It takes a list of oracle categories and writes them to markdown files.
 * @param oracles - The list of oracle categories.
 * @param mdPath - The path to the directory where the markdown files will be written.
 */
function buildOracleMarkdown(oracles, mdPath) {
    const mdOraclePath = mdPath + "/oracles";
    oracles.filter(oracle => oracle.$id !== "Starforged/Oracles/Moves").forEach((oracleCat) => {
        let text = (0, renderOracleCategory_js_1.renderOracleCategory)(oracleCat, 1) + "\n";
        const currentFile = lodash_es_1.default.kebabCase(oracleCat.Name) + ".md";
        const filePath = `${mdOraclePath}/${currentFile}`;
        text = (0, transformHyperlink_js_1.transformMoveLinks)(text);
        text = (0, transformHyperlink_js_1.transformOracleLinks)(oracles, text, currentFile);
        (0, fs_1.writeFileSync)(filePath, text, { encoding: "utf-8" });
    });
    let allOracleText = [
        "# Starforged Oracles",
        oracles.filter(oracleCat => oracleCat.$id !== "Starforged/Oracles/Moves").map((oracleCat) => (0, renderOracleCategory_js_1.renderOracleCategory)(oracleCat, 2))
    ].flat(2).join("\n\n");
    const currentFile = "oracles.md";
    allOracleText = (0, transformHyperlink_js_1.transformMoveLinks)(allOracleText, false);
    allOracleText = (0, transformHyperlink_js_1.transformOracleLinks)(oracles, allOracleText, currentFile);
    (0, fs_1.writeFileSync)(`${mdPath}/${currentFile}`, allOracleText + "\n", { encoding: "utf-8" });
}
exports.buildOracleMarkdown = buildOracleMarkdown;
//# sourceMappingURL=buildOracleMarkdown.js.map