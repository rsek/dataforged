import { type TSchema } from '@sinclair/typebox'
import * as Assets from './Assets.js'
import * as Atlas from './Atlas.js'
import * as DelveSites from './DelveSites.js'
import * as Moves from './Moves.js'
import * as Npcs from './Npcs.js'
import * as Oracles from './Oracles.js'
import * as Rarities from './Rarities.js'
import * as Rules from './Rules.js'
import * as Truths from './Truths.js'
import {
	Id,
	Localize,
	Metadata,
	Player,
	Progress,
	Rolls
} from './common/index.js'

export type Defs = Record<string, TSchema>
const Defs: Defs = {
	...Id,
	...Metadata,
	...Localize,
	...Rules,
	...Progress,
	...Npcs,
	...Rolls,
	...Oracles,
	...Moves,
	...Assets,
	...Truths,
	...Atlas,
	...Player,
	...Rarities,
	...DelveSites,
	...Rules
}
export default Defs
