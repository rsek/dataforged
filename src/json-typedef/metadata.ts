import { Metadata as base } from '../schema/datasworn/index.js'
import { toJtdModule } from './utils.js'

const Metadata = toJtdModule(base)

export default Metadata

// console.log(Metadata)
