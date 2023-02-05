// import { type JSONSchema7 } from 'json-schema'
// import oracle from './oracle'
// import asset from './asset'
// import attribute from '../json-schema/attribute'
// import metadata from './metadata'
// import move from './move'
// import truth from '../json-schema/truth'

// const dataforged: JSONSchema7 = {
//   $comment:
//     "Don't edit this by hand -- use the files in ./src/schema-ts instead.",
//   title: 'Dataforged',
//   required: ['_ruleset'],
//   properties: {
//     _ruleset: { const: 'starforged' }
//   },
//   additionalProperties: false,

//   patternProperties: {
//     [`^${IdPattern.namespaceFragment.source}$`]: {
//       $ref: '#/$defs/NamespaceStarforged'
//     }
//   }
// }

// const datasworn: JSONSchema7 = {
//   title: 'Datasworn',
//   required: ['_ruleset'],
//   properties: {
//     _ruleset: { const: 'classic' }
//   },
//   additionalProperties: false,

//   patternProperties: {
//     [`^${IdPattern.namespaceFragment.source}$`]: {
//       $ref: '#/$defs/NamespaceClassic'
//     }
//   }
// }

// const schema: JSONSchema7 = {
//   $schema: 'http://json-schema.org/draft-07/schema',
//   description: 'Schema definitions used for Datasworn and Dataforged (v2+).',
//   $defs: {
//     ...id,
//     ...asset,
//     ...oracle,
//     ...player,
//     ...attribute,
//     ...cyclopedia,
//     ...delveSite,
//     ...localized,
//     ...metadata,
//     ...move,
//     ...progressTrack,
//     ...truth,
//     // ...gameObject,
//     NamespaceClassic: DataswornCollection,
//     NamespaceStarforged
//   },
//   oneOf: [datasworn, dataforged]
// }

// export default schema
