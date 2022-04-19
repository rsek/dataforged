"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encounterStats = void 0;
const Gamespace_js_1 = require("../json_out/common/Gamespace.js");
const lodash_es_1 = __importDefault(require("lodash-es"));
/**
 * Creates a string of encounter stats for use in build messages.
 * @param gamespace
 * @param json
 */
function encounterStats(gamespace, json) {
    var _a;
    let text;
    switch (gamespace) {
        case Gamespace_js_1.Gamespace.Starforged:
            {
                const encounterCount = json.length;
                const variantCount = (_a = lodash_es_1.default.sum(json.map(enc => { var _a; return (_a = enc.Variants) === null || _a === void 0 ? void 0 : _a.length; }))) !== null && _a !== void 0 ? _a : 0;
                text = `${encounterCount} encounters (plus ${variantCount} encounter variants)`;
            }
            break;
        case Gamespace_js_1.Gamespace.Ironsworn:
            {
                const natureCount = json.length;
                const encounterCount = lodash_es_1.default.sum(json.map(enc => enc.Encounters.length));
                text = `${encounterCount} encounters across ${natureCount} nature types`;
            }
            break;
        default:
            throw new Error();
    }
    return text;
}
exports.encounterStats = encounterStats;
;
//# sourceMappingURL=encounterStats.js.map