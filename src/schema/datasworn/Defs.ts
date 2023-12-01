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
import { pickBy } from 'lodash-es'

function validateSchemaDefinitions(defs: Record<string, TSchema>) {
	const usedRefs = new Set<string>()
	const availableRefs = new Set<string>()

	// lazy way to iterate over all values
	void JSON.stringify(defs, (k, v) => {
		if (k === '$ref') usedRefs.add(v)
		if (k === '$id') availableRefs.add(v)
		return v
	})

	const invalidPointers = new Set<string>()
	const unusedDefinitions = new Set<string>()

	const allPointers = new Set<string>([...usedRefs, ...availableRefs])

	for (const pointer of allPointers) {
		if (!usedRefs.has(pointer)) unusedDefinitions.add(pointer)
		if (!availableRefs.has(pointer)) invalidPointers.add(pointer)
	}

	// console.log('unusedDefinitions', unusedDefinitions)
	// console.log('invalidPointers', invalidPointers)
}

const defsBase = pickBy(
	{
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
	} as Record<string, TSchema>,
	(schema, key) => {
		if (!TypeGuard.TSchema(schema)) return false

		if (typeof schema.$id !== 'string') {
			Log.warn(`Schema in $defs, but doesn't have an ID?`, schema)
			return false
		}

		if (key !== schema.$id)
			Log.warn(`Schema has $id ${schema.$id}, but its key is ${key}`)

		return true
	}
)

validateSchemaDefinitions(defsBase)

export type Defs = Record<string, TSchema>
const entries: [string, TSchema][] = Object.values<TSchema>(defsBase).map(
	(entry) => {
		if (typeof entry.$id !== 'string')
			throw new Error(
				`Schema in definitions is missing an $id:\n${JSON.stringify(
					entry,
					undefined,
					'\t'
				)}`
			)
		return [entry.$id, entry]
	}
)


const Defs: Defs = Object.fromEntries(entries)
// await fs.writeJson('baddefs.json', Defs, { spaces: '\t' })

export default Defs
