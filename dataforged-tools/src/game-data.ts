/* eslint-disable no-restricted-imports */
import type { Ironsworn, Starforged } from '@schema'
import IS from './json/ironsworn/datasworn.json' assert {type: "json"}
import SF from './json/starforged/dataforged.json' assert {type: "json"}

/**
 * @public
 */
const starforged = SF as unknown as Starforged
/**
 * @public
 */
const ironsworn = IS as unknown as Ironsworn

export { starforged, ironsworn }
