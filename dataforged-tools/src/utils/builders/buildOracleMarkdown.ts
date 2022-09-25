// import type { OracleCategory } from "@classes";
// import type { OracleCategory } from "@json_out";
// import { renderOracleCategory } from "@utils/md/renderOracleCategory.js";
// import { transformMoveLinks, transformOracleLinks } from "@utils/md/transformHyperlink.js";
// import _ from "lodash-es";
// import { writeFileSync } from "fs";

// /**
//  * It takes a list of oracle categories and writes them to markdown files.
//  * @param oracles - The list of oracle categories.
//  * @param mdPath - The path to the directory where the markdown files will be written.
//  */
// export function buildOracleMarkdown(oracles: OracleCategory[], mdPath: string) {
//   const mdOraclePath = mdPath + "/oracles";

//   oracles.filter(oracle => oracle.$id !== "Starforged/Oracles/Moves").forEach((oracleCat) => {
//     let text = renderOracleCategory(oracleCat, 1) + "\n";
//     const currentFile = _.kebabCase(oracleCat.Name) + ".md";
//     const filePath = `${mdOraclePath}/${currentFile}`;
//     text = transformMoveLinks(text);
//     text = transformOracleLinks(oracles, text, currentFile as `${string}.md`);
//     writeFileSync(filePath, text, { encoding: "utf-8" });
//   });

//   let allOracleText = [
//     "# Starforged Oracles",
//     oracles.filter(oracleCat => oracleCat.$id !== "Starforged/Oracles/Moves").map((oracleCat) => renderOracleCategory(oracleCat, 2))
//   ].flat(2).join("\n\n");
//   const currentFile = "oracles.md";
//   allOracleText = transformMoveLinks(allOracleText, false);
//   allOracleText = transformOracleLinks(oracles, allOracleText, currentFile);

//   writeFileSync(`${mdPath}/${currentFile}`, allOracleText + "\n", { encoding: "utf-8" });
// }