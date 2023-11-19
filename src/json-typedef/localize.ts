import { type JTDSchemaType } from 'ajv/dist/core'
import { mapValues } from 'lodash-es'
import { Localize as base } from '../schema/datasworn/index.js'
import { toJtdModule } from './utils.js'

const Localize = toJtdModule(base)

export default Localize

console.log(Localize)
