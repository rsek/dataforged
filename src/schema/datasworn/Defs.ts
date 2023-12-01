import { TypeGuard, type TSchema } from '@sinclair/typebox'
import * as Assets from './Assets.js'
import * as Atlas from './Atlas.js'
import * as DelveSites from './DelveSites.js'
import * as Moves from './Moves.js'
import * as Npcs from './Npcs.js'
import * as Oracles from './Oracles.js'
import * as Rarities from './Rarities.js'
import * as Rules from './Rules.js'
import * as Truths from './Truths.js'
import { RulesPackage, Ruleset, Expansion } from './RulesPackages.js'
import {
	Id,
	Localize,
	Metadata,
	Player,
	Progress,
	Rolls,
	RollableValues
} from './common/index.js'
import Log from '../../scripts/utils/Log.js'

function validateSchemaDefinitions(defs: Defs) {
	const usedRefs = new Set<string>()
	const availableRefs = new Set<string>()

	// lazy way to iterate over all values
	void JSON.stringify(defs, (k, v) => {
		if (k === '$ref') usedRefs.add(v)
		if (k === '$id') availableRefs.add(v)
		return v
	})

	const validPointers = new Set<string>()

	const orphanPointers = new Set<string>()
	const orphanDefinitions = new Set<string>()

	const allPointers = new Set<string>(...usedRefs, ...availableRefs)
}

export type Defs = Record<string, TSchema>
const entries: [string, TSchema][] = Object.values<TSchema>({
	RulesPackage,
	Ruleset,
	Expansion,
	...Id,
	...Metadata,
	...Localize,
	...Rules,
	...Progress,
	...RollableValues,
	...Npcs,
	...Rolls,
	...Oracles,
	...Moves,
	...Assets,
	...Truths,
	...Atlas,
	...Player,
	...Rarities,
	...DelveSites
})
	.filter((schema) => {
		if (!TypeGuard.TSchema(schema)) return false

		if (typeof schema.$id !== 'string') {
			Log.warning(`Schema in $defs, but doesn't have an ID?`, schema)
			return false
		}
		return true
	})
	.map((entry) => {
		if (typeof entry.$id !== 'string')
			throw new Error(
				`Schema in definitions is missing an $id:\n${JSON.stringify(
					entry,
					undefined,
					'\t'
				)}`
			)
		return [entry.$id, entry]
	})

const Defs: Defs = Object.fromEntries(entries)
// await fs.writeJson('baddefs.json', Defs, { spaces: '\t' })

export default Defs
