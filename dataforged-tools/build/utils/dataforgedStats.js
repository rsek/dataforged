import { Game } from '../schema'
import _ from 'lodash-es'
/**
 * Extracts statistics on Ironsworn game data.
 */
export function dataforgedStats (game, { 'Asset types': assets, Encounters: encounters, 'Move categories': moves, 'Oracle sets': oracles, 'Setting truths': truths }) {
  return [
    assetStats(assets),
    encounterStats(game, encounters),
    moveStats(moves),
    truthStats(truths),
    oracleStats(oracles)
  ].join(',\n')
}
export function assetStats (assetTypes) {
  const types = Object.keys(assetTypes)
  const assets = _.flatMap(assetTypes, (type) => Object.keys(type.Assets))
  return `${assets.length} assets comprising ${types.length} types`
}
export function truthStats (truthCategories) {
  return `${Object.keys(truthCategories).length ?? 0} setting truth categories`
}
export function moveStats (moveCategories) {
  const categories = Object.keys(moveCategories)
  const moves = _.flatMap(moveCategories, (category) => Object.keys(category.Moves))
  return `${categories.length} move categories containing ${moves.length} moves`
}
/**
 * Creates a string of oracle stats for use in build messages.
 * @param oracles
 */
export function oracleStats (oracles) {
  const tables = 0
  const sets = 0
  return `${tables} oracle tables in ${sets} sets`
}
/**
 * Creates a string of encounter stats for use in build messages.
 * @param game
 * @param json
 */
export function encounterStats (game, json) {
  let text
  switch (game) {
    case Game.Starforged:
      {
        const encounterJson = json
        const encounters = Object.keys(encounterJson)
        const variants = _.flatMap(encounterJson, (enc) => enc.Variants)
        text = `${encounters.length} encounters (plus ${variants.length} encounter variants)`
      }
      break
    case Game.Ironsworn:
      {
        const encounterJson = json
        const natures = Object.keys(encounterJson)
        const encounters = _.flatMap(encounterJson, (nature) => nature.Encounters)
        text = `${encounters.length} encounters across ${natures.length} nature types`
      }
      break
    default:
      throw new Error()
  }
  return text
}
;
// # sourceMappingURL=dataforgedStats.js.map
