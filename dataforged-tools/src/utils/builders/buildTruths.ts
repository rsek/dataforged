import { TruthStarforgedBuilder, TruthClassicBuilder } from '@builders'
import { MASTER_DATA_PATH } from '@constants'
import { Game } from '@schema'
import { buildLog } from '@utils/logging/buildLog.js'
import { concatWithYamlRefs } from '@utils/yaml/concatWithYamlRefs.js'
import type { YamlTruthRootClassic, YamlTruthRootStarforged } from '@schema'
import { existsSync } from 'fs'
import _ from 'lodash-es'

/**
 * It takes the YAML files that contain the setting truths, and builds a list of SettingTruth objects
 * @returns An array of SettingTruth objects.
 */
export function buildTruths<G extends Game>(game: G) {
  buildLog(buildTruths, 'Building setting truths...')

  const filePath = `${MASTER_DATA_PATH as string}/${game}/Truths.yaml`
  if (!existsSync(filePath)) {
    buildLog(buildTruths, 'No setting truth file found. Returned an empty array.')
    return {}
  }
  switch (game) {
    case Game.Ironsworn: {
      const truthsRoot = concatWithYamlRefs(undefined, filePath) as YamlTruthRootClassic
      const truths = _.mapValues(truthsRoot.setting_truths, (item, key) => new TruthClassicBuilder(item, key, { ...truthsRoot, $id: `${game}/setting_truths` }))
      return truths
    }
    case Game.Starforged: {
      const truthsRoot = concatWithYamlRefs(undefined, filePath) as YamlTruthRootStarforged
      const truths = _.mapValues(truthsRoot.setting_truths, item => new TruthStarforgedBuilder(item, truthsRoot.source))
      buildLog(buildTruths, `Finished building ${truths.length} setting truth categories.`)
      return truths
    }
    default:
      throw new Error()
  }
}
