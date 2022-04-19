/* eslint-disable no-restricted-imports */
export * from "./json_out/index.js";
import assets_json from "./starforged-assets.json" assert { type: "json" };
import encounters_json from "./starforged-encounters.json" assert { type: "json" };
import moves_json from "./starforged-moves.json" assert { type: "json" };
import oracles_json from "./starforged-oracles.json" assert { type: "json" };
import setting_truths_json from "./starforged-setting_truths.json" assert { type: "json" };
;
/**
 * @public
 */
const data = {
    assets: assets_json,
    encounters: encounters_json,
    moves: moves_json,
    oracles: oracles_json,
    truths: setting_truths_json,
};
export { data };
//# sourceMappingURL=index.js.map