import { Gamespace } from "../json_out/common/Gamespace.js";
import _ from "lodash-es";
/**
 * Creates a string of encounter stats for use in build messages.
 * @param gamespace
 * @param json
 */
export function encounterStats(gamespace, json) {
    var _a;
    let text;
    switch (gamespace) {
        case Gamespace.Starforged:
            {
                const encounterCount = json.length;
                const variantCount = (_a = _.sum(json.map(enc => { var _a; return (_a = enc.Variants) === null || _a === void 0 ? void 0 : _a.length; }))) !== null && _a !== void 0 ? _a : 0;
                text = `${encounterCount} encounters (plus ${variantCount} encounter variants)`;
            }
            break;
        case Gamespace.Ironsworn:
            {
                const natureCount = json.length;
                const encounterCount = _.sum(json.map(enc => enc.Encounters.length));
                text = `${encounterCount} encounters across ${natureCount} nature types`;
            }
            break;
        default:
            throw new Error();
    }
    return text;
}
;
//# sourceMappingURL=encounterStats.js.map