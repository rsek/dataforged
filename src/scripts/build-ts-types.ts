import { writeFileSync } from 'fs'
import { JSONSchema4 } from 'json-schema'
import { compile } from 'json-schema-to-typescript'
import schema from '../schema-ts'


compile(schema as JSONSchema4, 'YamlRoot', {unreachableDefinitions: true})
  .then(typings => {

    writeFileSync('./src/types/dataforged-yaml.d.ts', typings)
  })

// TODO: make this smarter about extending/inheriting types?
// ditto enums
// are these transforms sth i could accomplish with a DIY solution?

// if nothing else, it's definitely faster now!

// alternately: ship with a "type your TS using json schemas library"?