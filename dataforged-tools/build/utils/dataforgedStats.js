import { Gamespace } from "../schema_json";
import { JSONPath } from "jsonpath-plus";
import _ from "lodash-es";
/**
 * Extracts statistics on Ironsworn game data.
 */
export function dataforgedStats(gamespace, { "Asset Types": assets, Encounters: encounters, "Move Categories": moves, "Oracle Sets": oracles, "Setting Truths": truths }) {
    return [
        assetStats(assets),
        encounterStats(gamespace, encounters),
        moveStats(moves),
        truthStats(truths),
        oracleStats(oracles)
    ].join(",\n");
}
export function assetStats(assetTypes) {
    let types = Object.keys(assetTypes);
    let assets = _.flatMap(assetTypes, (type) => Object.keys(type.Assets));
    return `${assets.length} assets comprising ${types.length} types`;
}
export function truthStats(truthCategories) {
    return `${Object.keys(truthCategories).length ?? 0} setting truth categories`;
}
export function moveStats(moveCategories) {
    const categories = Object.keys(moveCategories);
    const moves = _.flatMap(moveCategories, (category) => Object.keys(category.Moves));
    return `${categories.length} move categories containing ${moves.length} moves`;
}
/**
 * Creates a string of oracle stats for use in build messages.
 * @param oracles
 */
export function oracleStats(oracles) {
    const oracleTables = JSONPath({ path: "$..Oracles[*][Table]", json: oracles });
    return `${oracleTables.length} oracle tables in ${Object.keys(oracles["Oracle Sets"]).length} sets`;
}
/**
 * Creates a string of encounter stats for use in build messages.
 * @param gamespace
 * @param json
 */
export function encounterStats(gamespace, json) {
    let text;
    switch (gamespace) {
        case Gamespace.Starforged:
            {
                let encounterJson = json;
                const encounters = Object.keys(encounterJson);
                const variants = _.flatMap(encounterJson, (enc) => enc.Variants);
                text = `${encounters.length} encounters (plus ${variants.length} encounter variants)`;
            }
            break;
        case Gamespace.Ironsworn:
            {
                let encounterJson = json;
                const natures = Object.keys(encounterJson);
                const encounters = _.flatMap(encounterJson, (nature) => nature.Encounters);
                text = `${encounters.length} encounters across ${natures.length} nature types`;
            }
            break;
        default:
            throw new Error();
    }
    return text;
}
;
//# sourceMappingURL=dataforgedStats.js.map