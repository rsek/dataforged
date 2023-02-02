import { writeFileSync } from 'fs'
import { JSONSchema4 } from 'json-schema'
import { compile } from 'json-schema-to-typescript'
import schema from '../schema-ts'


compile(schema as JSONSchema4, 'YamlRoot', {unreachableDefinitions: true, declareExternallyReferenced: false})
  .then(typings => {

    writeFileSync('./src/types/dataforged-yaml.d.ts', typings)
  })