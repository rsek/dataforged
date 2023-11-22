import {
	TypeClone,
	type SchemaOptions,
	type Static,
	type TSchema
} from '@sinclair/typebox'
import { SCHEMA_ID, VERSION } from '../../scripts/const.js'

import {
	ID,
	Localize,
	Metadata,
	Player,
	Progress,
	Rolls
} from './common/index.js'

import * as Assets from './Assets.js'
import * as Atlas from './Atlas.js'
import * as DelveSites from './DelveSites.js'
import * as Moves from './Moves.js'
import * as Npcs from './Npcs.js'
import * as Oracles from './Oracles.js'
import * as Rarities from './Rarities.js'
import * as Rules from './Rules.js'
import { Ruleset } from './Ruleset.js'
import * as Truths from './Truths.js'

export const $schema = 'http://json-schema.org/draft-07/schema#'

export type SchemaDefs = Record<string, TSchema>

export interface RootOptions<Defs extends SchemaDefs = SchemaDefs>
	extends Required<
		Omit<SchemaOptions, 'default' | 'readOnly' | 'writeOnly' | 'examples'>
	> {
	$id: `${'https' | 'http'}://${string}`
	$defs: Defs
	$schema: string
}

export type TRoot<
	T extends TSchema = TSchema,
	Options extends RootOptions = RootOptions
> = T & Options

export function SchemaRoot<T extends TSchema, Options extends RootOptions>(
	base: T,
	options: Options
) {
	return TypeClone.Type(base, options) as TRoot<T, Options>
}

export const DataswornRoot = SchemaRoot(Ruleset, {
	$id: SCHEMA_ID,
	title: `Datasworn v${VERSION}`,
	description:
		'Describes game rules compatible with the Ironsworn tabletop role-playing game by Shawn Tomkin.',
	$schema,
	$defs: {
		...ID,
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
})

export type DataswornRoot = Static<typeof DataswornRoot>
