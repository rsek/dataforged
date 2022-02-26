
import t from 'ts-runtime/lib';
import fs from "fs";
import Asset from "../types/assets/Asset";
import { Encounter } from "../types/encounters/Encounter";
import Move from "../types/moves/Move";
import OracleCategoryInfo from "../types/oracles/classes/OracleCategory";
import { SettingTruth } from "../types/truths/SettingTruth";
import buildAssets from "./buildAssets";
import buildEncounters from "./buildEncounters";
import buildMoves from "./buildMoves";
import buildOracles from "./buildOracles";
import buildTruths from "./buildTruths";
import writeJson from "./io/writeJSON";
import buildLog from './logging/buildLog';

export interface IronswornData {
  assets: Asset[];
  encounters: Encounter[];
  moves: Move[];
  oracles: OracleCategoryInfo[];
  setting_truths: SettingTruth[];
}

export default function buildDataforged(): IronswornData {
  buildLog(buildDataforged, "Building Dataforged...");
  const assets = buildAssets();
  const encounters = buildEncounters();
  const moves = buildMoves();
  const oracles = buildOracles();
  const setting_truths = buildTruths();

  buildLog(buildDataforged, `Finished building ${assets.length} assets, ${encounters.length} encounters, ${moves.length} moves, ${oracles.length} oracle categories, and ${setting_truths.length} setting truth categories.`);
  let data = {
    assets,
    encounters,
    moves,
    oracles,
    setting_truths
  }
  return data;
}
