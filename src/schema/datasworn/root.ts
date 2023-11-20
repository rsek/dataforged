import {
	type SchemaOptions,
	type Static,
	type TSchema,
	TypeClone
} from '@sinclair/typebox'
import { SCHEMA_ID, VERSION } from '../../scripts/const.js'

import { Metadata, ID, Localize, Player, Progress } from './common/index.js'

import * as Moves from './moves.js'
import * as Assets from './assets.js'
import * as Oracles from './oracles.js'
import * as Npcs from './npcs.js'
import * as Atlas from './atlas.js'
import * as Truths from './truths.js'
import * as DelveSites from './delve-sites.js'
import * as Rarities from './rarities.js'
import * as Rules from './rules.js'
import { Ruleset } from './ruleset.js'

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

export function Root<T extends TSchema, Options extends RootOptions>(
	base: T,
	options: Options
) {
	return TypeClone.Type(base, options) as TRoot<T, Options>
}

export const DataswornRoot = Root(Ruleset, {
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
