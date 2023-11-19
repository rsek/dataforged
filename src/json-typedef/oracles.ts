import { Oracles as Schema } from '../schema/datasworn/index.js'
import { toJtdModule } from './utils.js'

const Oracles = toJtdModule(Schema)

export default Oracles
