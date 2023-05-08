import Ajv from 'ajv'
import addFormats from 'ajv-formats'

import * as StarforgedInput from 'data-in/dataforged/starforged-input.schema.json'
import * as Starforged from 'data-out/dataforged/starforged.schema.json'

import * as ClassicInput from 'data-in/datasworn/classic-input.schema.json'
import * as Classic from 'data-out/datasworn/classic.schema.json'

export const ajv = new Ajv()
addFormats(ajv)

ajv.addSchema(StarforgedInput, 'StarforgedInput')
ajv.addSchema(Starforged, 'Starforged')
ajv.addSchema(ClassicInput, 'ClassicInput')
ajv.addSchema(Classic, 'Classic')
