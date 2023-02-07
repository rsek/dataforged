/**
 * Regenerates schema for YAML input and writes it to file
 */

import { writeFileSync } from 'fs'
import { Dataforged } from '../json-schema/index.js'

const out = './src/data/schema-input.json'

const json = JSON.stringify(Dataforged.SchemaInput, undefined, 2)

writeFileSync(out, json)
