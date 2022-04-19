"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDataforged = void 0;
const Gamespace_js_1 = require("../json_out/common/Gamespace.js");
const buildAssets_js_1 = require("./buildAssets.js");
const buildEncounters_js_1 = require("./buildEncounters.js");
const buildMoves_js_1 = require("./buildMoves.js");
const buildOracles_js_1 = require("./buildOracles.js");
const buildTruths_js_1 = require("./buildTruths.js");
const dataforgedStats_js_1 = require("./dataforgedStats.js");
const buildLog_js_1 = require("./logging/buildLog.js");
/**
 * Builds all data for Dataforged.
 * @returns An object keyed with the game data.
*/
function buildDataforged(gamespace = Gamespace_js_1.Gamespace.Starforged) {
    (0, buildLog_js_1.buildLog)(buildDataforged, `Building Dataforged for ${gamespace}...`);
    const assets = (0, buildAssets_js_1.buildAssets)(gamespace);
    const encounters = (0, buildEncounters_js_1.buildEncounters)(gamespace);
    const moves = (0, buildMoves_js_1.buildMoves)(gamespace);
    const oracles = (0, buildOracles_js_1.buildOracles)(gamespace);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const setting_truths = (0, buildTruths_js_1.buildTruths)(gamespace);
    const data = {
        assets,
        encounters,
        moves,
        oracles,
        setting_truths
    };
    (0, buildLog_js_1.buildLog)(buildDataforged, `Finished building JSON for ${gamespace}:
    ${(0, dataforgedStats_js_1.dataforgedStats)(gamespace, data)}`);
    return data;
}
exports.buildDataforged = buildDataforged;
//# sourceMappingURL=buildDataforged.js.map