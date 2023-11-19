import { ID as base } from '../schema/datasworn/index.js'
import { toJtdModule } from './utils.js'

const ID = toJtdModule(base)

export default ID

// FIXME: broken because there's a couple ID pattern unions. either simplify them or write a converter for them

console.log(ID)
