/* eslint-disable no-restricted-imports */
import assets_is from "./json/ironsworn/assets.json" assert { type: "json" };
import encounters_is from "./json/ironsworn/encounters.json" assert { type: "json" };
import moves_is from "./json/ironsworn/moves.json" assert { type: "json" };
import oracles_is from "./json/ironsworn/oracles.json" assert { type: "json" };
/**
 * @public
 */
const dataIronsworn = {
    assets: assets_is,
    encounters: encounters_is,
    moves: moves_is,
    oracles: oracles_is,
};
export { dataIronsworn };
