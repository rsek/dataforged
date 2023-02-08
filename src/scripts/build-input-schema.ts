/**
 * Regenerates schema for YAML input and writes it to file
 */

import { writeFileSync } from 'fs'
import { Schema } from '@df-json-schema'

// Write Starforged-compatible schema for Dataforged
const dfOut = './src/data-in/dataforged/schema-dataforged-input.json'

const dfJson = JSON.stringify(Schema.DataforgedInput, undefined, 2)

writeFileSync(dfOut, dfJson)

// Write Ironsworn-compatible schema for Datasworn
const dsOut = './src/data-in/datasworn/schema-datasworn-input.json'

const dsJson = JSON.stringify(Schema.DataswornInput, undefined, 2)

writeFileSync(dsOut, dsJson)
