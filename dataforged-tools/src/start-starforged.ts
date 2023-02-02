import 'source-map-support/register.js'
import { JSON_PATHS } from '@constants'
import { Game } from '@schema'
import type { Starforged } from '@schema'
import { buildDataforged } from '@utils/builders/buildDataforged.js'
import { writeJson } from '@utils/io/writeJSON.js'
import _ from 'lodash'

const data = buildDataforged(Game.Starforged) as Starforged
export { data }

_.forEach(data, (value, key) => {
  if (typeof value !== 'string' && typeof value !== 'undefined') {
    let fileName = ''
    switch (key as keyof Starforged) {
      case 'asset_types': {
        fileName = 'assets'
        break
      }
      case 'encounters': {
        fileName = 'encounters'
        break
      }
      case 'oracle_sets': {
        fileName = 'oracles'
        break
      }
      case 'move_categories': {
        fileName = 'moves'
        break
      }
      case 'setting_truths': {
        fileName = 'truths'
        break
      }
      default:
        throw new Error(`Unknown key in game data root object: ${key}`)
    }
    JSON_PATHS.forEach(path => {
      const newPath = path + `/starforged/${fileName}.json`
      // eslint-disable-next-line no-console
      console.log(`[StartStarforged] Writing json to ${newPath}`)
      writeJson(newPath, value)
    })
  }
})

JSON_PATHS.forEach(path => writeJson(path + '/starforged/dataforged.json', data))
