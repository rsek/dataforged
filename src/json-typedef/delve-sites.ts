import { DelveSites as Schema } from '../schema/datasworn/index.js'
import { toJtdModule } from './utils.js'

const DelveSites = toJtdModule(Schema)

export default DelveSites
