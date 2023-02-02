import { OracleSetBuilder } from '@builders'
import { MASTER_DATA_PATH, REFS_PATH } from '@constants'
import { GameDataRoot, Game, YamlOracleRoot, YamlOracleSet } from '@schema'
import { oracleStats } from '@utils/dataforgedStats.js'
import { buildLog } from '@utils/logging/buildLog.js'
import { concatWithYamlRefs } from '@utils/yaml/concatWithYamlRefs.js'
import fs from 'fs-extra'

import fg from 'fast-glob'
import _ from 'lodash'
import { validate } from 'jsonschema'
import { badJsonError } from '@utils/logging/badJsonError.js'

const SCHEMA_YAML = fs.readJsonSync('../_master-data/schema/oracles.json')

/**
 * It takes the data from the oracles directory and builds a list of {@link OracleSetBuilder} objects.
 * @returns An array of {@link OracleSetBuilder} objects.
 */
export function buildOracles(game: Game = Game.Starforged): GameDataRoot['oracle_sets'] {
  buildLog(buildOracles, 'Building oracles...')

  const oracleSetFiles = fg.sync(`${MASTER_DATA_PATH as string}/${game}/Oracles/**/*.(yml|yaml)`, { onlyFiles: true })

  const oracleSetData = _.omitBy(concatWithYamlRefs<YamlOracleRoot>(REFS_PATH, ...oracleSetFiles), (v, k) => k.startsWith('_')) as YamlOracleRoot
  // const validation = validate(oracleSetData,SCHEMA_YAML)
  // if (!validation.valid) {
  //   throw badJsonError(buildOracles,validation.errors.map(err => _.omit(err, "instance", "schema")))
  // }
// @ts-expect-error
  const oracleJson = _(oracleSetData.oracle_sets).mapValues((oracleSet, setFragment) => new OracleSetBuilder(oracleSet as YamlOracleSet, setFragment, { ...oracleSetData, $id: `${game}/oracles` })).value()

  buildLog(buildOracles, `Finished building ${oracleStats(oracleJson)}`)
  return oracleJson
}
