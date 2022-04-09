import { renderOracleCategory } from "./md/renderOracleCategory.js";
import { transformMoveLinks, transformOracleLinks } from "./md/transformHyperlink.js";
import _ from "lodash-es";
import { writeFileSync } from "fs";
export function buildOracleMarkdown(oracles, mdPath) {
    const mdOraclePath = mdPath + "oracles/";
    oracles.filter(oracle => oracle.$id !== "Oracles / Moves").forEach((oracleCat) => {
        let text = renderOracleCategory(oracleCat, 1) + "\n";
        const currentFile = _.kebabCase(oracleCat.Name) + ".md";
        const filePath = mdOraclePath + currentFile;
        text = transformMoveLinks(text);
        text = transformOracleLinks(oracles, text, currentFile);
        writeFileSync(filePath, text, { encoding: "utf-8" });
    });
    let allOracleText = [
        "# Starforged Oracles",
        oracles.filter(oracleCat => oracleCat.$id !== "Oracles / Moves").map((oracleCat) => renderOracleCategory(oracleCat, 2))
    ].flat(2).join("\n\n");
    const currentFile = "oracles.md";
    allOracleText = transformMoveLinks(allOracleText, false);
    allOracleText = transformOracleLinks(oracles, allOracleText, currentFile);
    writeFileSync(mdPath + currentFile, allOracleText + "\n", { encoding: "utf-8" });
}
//# sourceMappingURL=buildOracleMarkdown.js.map