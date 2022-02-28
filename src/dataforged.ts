import { PathLike, writeFileSync } from 'fs';
import _ from 'lodash';

import buildDataforged from "./functions/buildDataforged";
import writeJson from './functions/io/writeJSON';
import renderMoves from './functions/md/renderMoves';
import renderOracleCategory from './functions/md/renderOracleCategory';

const pathOut: PathLike = "./";
const mdPath: PathLike = pathOut + "markdown/";
// const legacyPathOut: PathLike = "./legacy/"

let data = buildDataforged();

_.forEach(data, (value, key) => {
  writeJson(pathOut.toString() + `starforged-${key}.json` as PathLike, value)
});


const mdOraclePath: PathLike = mdPath + "Oracles/";

data.oracles.filter(oracle => oracle.$id != "Oracles / Moves").forEach((oracleCat) => {
  let text = renderOracleCategory(oracleCat, 1) + "\n";
  let filePath: PathLike = mdOraclePath + oracleCat.Name + ".md";
  writeFileSync(filePath, text, { encoding: 'utf-8' });
});

let allOracleText = [
  "# Starforged Oracles",
  data.oracles.filter(oracle => oracle.$id != "Oracles / Moves").map((oracleCat) => renderOracleCategory(oracleCat, 2))].join("\n\n").replace(/\(Moves#/g, "(Moves.md#");

writeFileSync(mdPath + "Oracles.md", allOracleText + "\n", { encoding: 'utf-8' });

writeFileSync(mdPath + "Moves.md", renderMoves(data.moves) + "\n", { encoding: 'utf-8' });