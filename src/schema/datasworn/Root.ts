import { type Static, Type } from '@sinclair/typebox'
import { SCHEMA_ID, SOURCE_SCHEMA_ID, VERSION } from '../../scripts/const.js'

import { RulesPackage } from './RulesPackages.js'
import { SchemaRoot, InputSchemaRoot } from './root/SchemaRoot.js'
import Defs from './Defs.js'

const $schema = 'http://json-schema.org/draft-07/schema#'

export const DataswornRoot = SchemaRoot(Type.Ref(RulesPackage), {
	$schema,
	$id: SCHEMA_ID,
	title: `Datasworn v${VERSION}`,
	description:
		'Describes game rules compatible with the Ironsworn tabletop role-playing game by Shawn Tomkin.',
	$defs: Defs
})

export const DataswornSourceRoot = InputSchemaRoot(Type.Ref(RulesPackage), {
	$schema,
	$id: SOURCE_SCHEMA_ID,
	title: `DataswornSource v${VERSION}`,
	description:
		'Source data schema for Datasworn, which describes game rules compatible with the Ironsworn tabletop roleplaying game by Shawn Tomkin.\n\nThe source data omits IDs, and makes properties that provide a default value optional; these values are inserted during validation/processing to produce the JSON for distribution.',
	$defs: Defs
})

export type DataswornRoot = Static<typeof DataswornRoot>
export type DataswornSourceRoot = Static<typeof DataswornSourceRoot>
