import assetsJson from "./json/starforged/assets.json" assert { type: "json" };
import encountersJson from "./json/starforged/encounters.json" assert { type: "json" };
import movesJson from "./json/starforged/moves.json" assert { type: "json" };
import oraclesJson from "./json/starforged/oracles.json" assert { type: "json" };
import truthsJson from "./json/starforged/setting_truths.json" assert { type: "json" };
/**
 * @public
 */
const dataStarforged = {
    assets: assetsJson,
    encounters: encountersJson,
    moves: movesJson,
    oracles: oraclesJson,
    truths: truthsJson,
};
export { dataStarforged };
