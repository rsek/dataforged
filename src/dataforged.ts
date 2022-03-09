import "source-map-support/register";
import { PathLike, writeFileSync } from "fs";
import _ from "lodash";
import buildDataforged from "./functions/buildDataforged";
import writeJson from "./functions/io/writeJSON";
import renderMoves from "./functions/md/renderMoves";
import renderOracleCategory from "./functions/md/renderOracleCategory";
import buildImages from "./functions/buildImages";

const pathOut: PathLike = "./";
const mdPath: PathLike = pathOut + "markdown/";
// const legacyPathOut: PathLike = "./legacy/"

const data = buildDataforged();

_.forEach(data, (value, key) => {
  writeJson(pathOut.toString() + `starforged-${key}.json` as PathLike, value)
});


const mdOraclePath: PathLike = mdPath + "Oracles/";

data.oracles.filter(oracle => oracle.$id != "Oracles / Moves").forEach((oracleCat) => {
  const text = renderOracleCategory(oracleCat, 1) + "\n";
  const filePath: PathLike = mdOraclePath + oracleCat.Name + ".md";
  writeFileSync(filePath, text, { encoding: "utf-8" });
});

const allOracleText = [
  "# Starforged Oracles",
  data.oracles.filter(oracle => oracle.$id != "Oracles / Moves").map((oracleCat) => renderOracleCategory(oracleCat, 2))].flat(2).join("\n\n").replace(/\(Moves#/g, "(Moves.md#");

writeFileSync(mdPath + "Oracles.md", allOracleText + "\n", { encoding: "utf-8" });

writeFileSync(mdPath + "Moves.md", renderMoves(data.moves) + "\n", { encoding: "utf-8" });

const srcRoot = "src/data/img";
const outRoot = "img";
const srcPng = "src/data/img/raster/png";
const outWebP = "img/raster/webp"

buildImages(srcRoot, outRoot, srcPng, outWebP);