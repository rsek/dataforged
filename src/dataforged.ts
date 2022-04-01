import "source-map-support/register.js";
import _ from "lodash-es";
import type { PathLike } from "fs";
import { writeFileSync } from "fs";
import buildDataforged from "./functions/buildDataforged.js";
import buildImages from "./functions/buildImages.js";
import writeJson from "./functions/io/writeJSON.js";
import renderMoves from "./functions/md/renderMoves.js";
import renderOracleCategory from "./functions/md/renderOracleCategory.js";
// import writeYaml from "./functions/io/writeYaml.js";
// import countDupes from "./functions/analysis/countDupes";
// import extractProperNouns from "./functions/analysis/extractProperNouns";
// import countDupesByLemma from "./functions/analysis/countDupesByStem.js";
// import extractPos from "./functions/analysis/extractPos";

const pathOut: PathLike = "./";
const mdPath: PathLike = pathOut + "markdown/";
// const legacyPathOut: PathLike = "./legacy/"

const data = buildDataforged();
export default data;

_.forEach(data, (value, key) => {
  writeJson(pathOut.toString() + `starforged-${key}.json` as PathLike, value);
});

// const nameData = extractProperNouns(data.oracles);
// writeYaml("name_duplicates.yaml" as PathLike, countDupes(nameData));

// const dupeData = countDupesByLemma(nameData);

// writeYaml("stem_duplicates.yaml" as PathLike, dupeData);

const mdOraclePath: PathLike = mdPath + "Oracles/";

data.oracles.filter(oracle => oracle.$id !== "Oracles / Moves").forEach((oracleCat) => {
  const text = renderOracleCategory(oracleCat, 1) + "\n";
  const filePath: PathLike = mdOraclePath + oracleCat.Name + ".md";
  writeFileSync(filePath, text, { encoding: "utf-8" });
});

const allOracleText = [
  "# Starforged Oracles",
  data.oracles.filter(oracle => oracle.$id !== "Oracles / Moves").map((oracleCat) => renderOracleCategory(oracleCat, 2)) ].flat(2).join("\n\n")
  .replace(/\(Moves#/g, "(Moves.md#");

writeFileSync(mdPath + "Oracles.md", allOracleText + "\n", { encoding: "utf-8" });

writeFileSync(mdPath + "Moves.md", renderMoves(data.moves) + "\n", { encoding: "utf-8" });

const srcRoot = "src/data/img";
const outRoot = "img";
const srcPng = "src/data/img/raster/png";
const outWebP = "img/raster/webp";

buildImages(srcRoot, outRoot, srcPng, outWebP);

// writeYaml("analysis/pos_verbs.yaml" as PathLike, extractPos.verbs);
// writeYaml("analysis/pos_nouns.yaml" as PathLike, extractPos.nouns);
// writeYaml("analysis/pos_adj.yaml" as PathLike, extractPos.adj);