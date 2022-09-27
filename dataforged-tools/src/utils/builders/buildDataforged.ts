
import { DelveCardType, Game } from "@schema";
import type { Ironsworn, Starforged } from "@schema";
import { buildAssets } from "@utils/builders/buildAssets.js";
import { buildEncounters } from "@utils/builders/buildEncounters.js";
import { buildMoves } from "@utils/builders/buildMoves.js";
import { buildOracles } from "@utils/builders/buildOracles.js";
import { buildTruths } from "@utils/builders/buildTruths.js";
import { dataforgedStats } from "@utils/dataforgedStats.js";
import { buildLog } from "@utils/logging/buildLog.js";
import { buildDelveSiteCards } from "@utils/builders/buildDelveSiteCards.js";
import { IronlandsBuilder } from "@builders/IronlandsBuilder.js";
import { SourceBuilder } from "@builders";

/**
 * Builds all data for Dataforged.
 * @returns An object keyed with the game data.
*/
export function buildDataforged(game: Game = Game.Starforged) {
  buildLog(buildDataforged, `Building Dataforged for ${game}...`);
  let data: Ironsworn|Starforged;
  switch (game) {
    case Game.Starforged: {
      data = {
        "Asset Types": buildAssets(game),
        Encounters: buildEncounters(game),
        "Move Categories": buildMoves(game),
        "Oracle Sets": buildOracles(game),
        "Setting Truths": buildTruths(game)
      } as Starforged;
      break;}
    case Game.Ironsworn: {
      data = {
        "Asset Types": buildAssets(game),
        Encounters: buildEncounters(game),
        "Move Categories": buildMoves(game),
        "Oracle Sets": buildOracles(game),
        "Setting Truths": buildTruths(game),
        "Site Themes": buildDelveSiteCards(DelveCardType.Theme),
        "Site Domains": buildDelveSiteCards(DelveCardType.Domain),
        Regions: new IronlandsBuilder(SourceBuilder.default(Game.Ironsworn)).toJson(),
        // Rarities
        // Delve Sites (the sample ones from Delve)
      } as Ironsworn;
      break;
    }
    default:
      throw new Error();
  }

  buildLog(buildDataforged, `Finished building JSON for ${game}:
    ${dataforgedStats(game, data)}`);
  return data;
}
