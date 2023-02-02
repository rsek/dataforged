import 'source-map-support/register.js'
import { JSON_PATHS } from '@constants'
import { Game } from '@schema'
import type { Ironsworn } from '@schema'
import { buildDataforged } from '@utils/builders/buildDataforged.js'
import { writeJson } from '@utils/io/writeJSON.js'
import _ from 'lodash'

const data = buildDataforged(Game.Ironsworn) as Ironsworn

_.forEach(data, (value, key: keyof Ironsworn) => {
  if (typeof value !== 'string' && typeof value !== 'undefined') {
    let fileName = ''
    switch (key) {
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
      case 'delve_site_domains': {
        fileName = 'delve-site-domains'
        break
      }
      case 'delve_site_themes': {
        fileName = 'delve-site-themes'
        break
      }
      case 'ironlands_regions': {
        fileName = 'regions'
        break
      }
      default:
        throw new Error(`Unknown key in game data root object: ${key}`)
    }
    JSON_PATHS.forEach(path => {
      const newPath = path + `/ironsworn/${fileName}.json`
      // eslint-disable-next-line no-console
      console.log(`[StartIronsworn] Writing json to ${newPath}`)
      writeJson(newPath, value)
    })
  }
})

JSON_PATHS.forEach(path => writeJson(path + '/ironsworn/datasworn.json', data))

// buildOracleMarkdown(data.oracles, MD_PATH);

// buildMoveMarkdown(data.moves, MD_PATH);

// const outRoot = "img";
// const outWebP = "img/raster/webp";

// buildImages(IMG_PATH as string, outRoot, MASTER_PNG_PATH as string, outWebP);
