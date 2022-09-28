import 'source-map-support/register.js'
import { JSON_PATHS } from './constants'
import { Game } from './schema'
import { buildDataforged } from './utils/builders/buildDataforged.js'
import { writeJson } from './utils/io/writeJSON.js'
import _ from 'lodash-es'
const data = buildDataforged(Game.Ironsworn)
_.forEach(data, (value, key) => {
  if (typeof value !== 'string' && typeof value !== 'undefined') {
    let fileName = ''
    switch (key) {
      case 'Asset types': {
        fileName = 'assets'
        break
      }
      case 'Encounters': {
        fileName = 'encounters'
        break
      }
      case 'Oracle sets': {
        fileName = 'oracles'
        break
      }
      case 'Move categories': {
        fileName = 'moves'
        break
      }
      case 'Setting truths': {
        fileName = 'truths'
        break
      }
      case 'Delve site domains': {
        fileName = 'delve-site-domains'
        break
      }
      case 'Delve site themes': {
        fileName = 'delve-site-themes'
        break
      }
      case 'Ironlands regions': {
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
// # sourceMappingURL=start-ironsworn.js.map
