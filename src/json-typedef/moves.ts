import { Moves as Schema } from '../schema/datasworn/index.js'
import { toJtdModule } from './utils.js'

const Moves = toJtdModule(Schema)

export default Moves
