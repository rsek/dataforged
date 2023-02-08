/**
 * Regenerates schema for YAML input and writes it to file
 */

import { writeFileSync } from 'fs'
import { Dataforged, Datasworn } from '../json-schema/index.js'

// Write Starforged-compatible schema for Dataforged
const dfOut = './src/data/dataforged/schema-dataforged-input.json'

const dfJson = JSON.stringify(Dataforged.SchemaInput, undefined, 2)

writeFileSync(dfOut, dfJson)

// Write Ironsworn-compatible schema for Datasworn
const dsOut = './src/data/datasworn/schema-datasworn-input.json'

const dsJson = JSON.stringify(Datasworn.SchemaInput, undefined, 2)

writeFileSync(dsOut, dsJson)
