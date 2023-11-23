import { type Static, type TSchema } from '@sinclair/typebox'
import { SCHEMA_ID, INPUT_SCHEMA_ID, VERSION } from '../../scripts/const.js'

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
import { SchemaRoot, InputSchemaRoot } from './root/SchemaRoot.js'

const $schema = 'http://json-schema.org/draft-07/schema#'

const $defs: Record<string, TSchema> = {
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

export const Datasworn = SchemaRoot(Ruleset, {
	$schema,
	$id: SCHEMA_ID,
	title: `Datasworn v${VERSION}`,
	description:
		'Describes game rules compatible with the Ironsworn tabletop role-playing game by Shawn Tomkin.',
	$defs
})

export const DataswornSource = InputSchemaRoot(Ruleset, {
	$schema,
	$id: INPUT_SCHEMA_ID,
	title: `DataswornSource v${VERSION}`,
	description:
		'Source data schema for Datasworn, which describes game rules compatible with the Ironsworn tabletop roleplaying game by Shawn Tomkin.\n\nThe source data omits IDs, and makes properties that provide a default value optional; these values are inserted during validation/processing to produce the JSON for distribution.',
	$defs
})

export type Datasworn = Static<typeof Datasworn>
export type DataswornSource = Static<typeof DataswornSource>
