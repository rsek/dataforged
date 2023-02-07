/**
 * Regenerates schema for YAML input and writes it to file
 */

import { writeFileSync } from 'fs'
import { Dataforged, Datasworn } from '../json-schema/index.js'

const dfOut = './src/data/dataforged/schema-dataforged-input.json'

const dfJson = JSON.stringify(Dataforged.SchemaInput, undefined, 2)

writeFileSync(dfOut, dfJson)

const dsOut = './src/data/datasworn/schema-datasworn-input.json'

const dsJson = JSON.stringify(Datasworn.SchemaInput, undefined, 2)

writeFileSync(dsOut, dsJson)
