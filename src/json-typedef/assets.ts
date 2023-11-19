import { Assets as Schema } from '../schema/datasworn/index.js'
import { toJtdModule } from './utils.js'

const Assets = toJtdModule(Schema)

export default Assets

console.log(Assets)
