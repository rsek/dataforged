import { Game } from "../schema";
import _ from 'lodash-es';
/**
 * Extracts statistics on Ironsworn game data.
 */
export function dataforgedStats(game, { asset_types, encounters, move_categories, oracle_sets, setting_truths }) {
    return [
        assetStats(asset_types),
        encounterStats(game, encounters),
        moveStats(move_categories),
        truthStats(setting_truths),
        oracleStats(oracle_sets)
    ].join(',\n');
}
export function assetStats(asset_types) {
    const types = Object.keys(asset_types);
    const assets = _.flatMap(asset_types, (type) => Object.keys(type.assets));
    return `${assets.length} assets comprising ${types.length} types`;
}
export function truthStats(setting_truths) {
    return `${Object.keys(setting_truths).length ?? 0} setting truth categories`;
}
export function moveStats(move_categories) {
    const categories = Object.keys(move_categories);
    const moves = _.flatMap(move_categories, (category) => Object.keys(category.moves));
    return `${categories.length} move categories containing ${moves.length} moves`;
}
/**
 * Creates a string of oracle stats for use in build messages.
 * @param oracles
 */
export function oracleStats(oracles) {
    const tables = 0;
    const sets = 0;
    return `${tables} oracle tables in ${sets} sets`;
}
/**
 * Creates a string of encounter stats for use in build messages.
 * @param game
 * @param json
 */
export function encounterStats(game, json) {
    let text;
    switch (game) {
        case Game.Starforged:
            {
                const encounterJson = json;
                const encounters = Object.keys(encounterJson);
                const variants = _.flatMap(encounterJson, (enc) => enc.variants);
                text = `${encounters.length} encounters (plus ${variants.length} encounter variants)`;
            }
            break;
        case Game.Ironsworn:
            {
                const encounterJson = json;
                const natures = Object.keys(encounterJson);
                const encounters = _.flatMap(encounterJson, (nature) => nature.encounters);
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