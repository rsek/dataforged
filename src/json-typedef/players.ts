import { Player as schema } from '../schema/datasworn/index.js'
import { toJtdModule } from './utils.js'

const Player = toJtdModule(schema)

export default Player
