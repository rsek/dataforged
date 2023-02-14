// import { writeFileSync } from 'fs'
// import { JSONSchema4 } from 'json-schema'
// import { compile } from 'json-schema-to-typescript'
// import schema from '../_schema-ts-old/index'

// compile(schema as JSONSchema4, 'YamlRoot', {
//   unreachableDefinitions: true
// }).then((typings) => {
//   writeFileSync('.@base-types/dataforged-yaml.d.ts', typings)
// })

// TODO: investigate rewriting this as a JSON Type Definition schema. it's purpose-made for generating types for multiple languages
// this can output many languages: https://jsontypedef.com/docs/jtd-codegen/
// i suspect it'll be smarter about e.g. enums and type inheritance
// discriminator can be used for things like TriggerActionRoll and TriggerProgressRoll

// if nothing else, it's definitely running faster now!

// AJV has lots of support for it.
// e.g. https://ajv.js.org/json-schema.html
// https://ajv.js.org/guide/typescript.html

// can help with migration, too:
// AJV JTD supports: "JSON Schema keywords, as long as their names are different from standard JTD keywords. It can be used to enable a gradual migration from JSON Schema to JTD, should it be required."

// the
