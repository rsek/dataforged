
import t from 'ts-runtime/lib';
import fs from "fs";
import Asset from "../types/assets/Asset";
import { Encounter } from "../types/encounters/Encounter";
import Move from "../types/moves/Move";
import OracleCategoryInfo from "../types/oracles/classes/OracleCategoryInfo";
import { Truth } from "../types/truths/Truth";
import buildAssets from "./buildAssets";
import buildEncounters from "./buildEncounters";
import buildMoves from "./buildMoves";
import buildOracles from "./buildOracles";
import buildTruths from "./buildTruths";
import writeJson from "./writeJSON";

export interface IronswornData {
  assets: Asset[];
  encounters: Encounter[];
  moves: Move[];
  oracles: OracleCategoryInfo[];
  setting_truths: Truth[];
}

export default function buildDataforged(): IronswornData {
  console.info("[buildDataforged] Building Dataforged...");
  const assets = buildAssets();
  const encounters = buildEncounters();
  const moves = buildMoves();
  const oracles = buildOracles();
  const setting_truths = buildTruths();
  // TODO: check all properties that target IDs against the generated objects
  // TODO: glossary
  // TODO: icons
  console.info(`[buildDataforged] Finished building ${assets.length} assets, ${encounters.length} encounters, ${moves.length} moves, ${oracles.length} oracle categories, and ${setting_truths.length} setting truth categories.`);
  let data = {
    assets,
    encounters,
    moves,
    oracles,
    setting_truths
  }
  return data;
}
