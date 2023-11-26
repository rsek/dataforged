import { type Static, Type } from '@sinclair/typebox'
import {
	PKG_SCOPE_COMMUNITY,
	PKG_SCOPE_OFFICIAL
} from '../../../scripts/const.js'
import { UnionEnumFromRecord } from '../../datasworn/utils/UnionEnumFromRecord.js'

export const DataPackageConfig = Type.Object({
	id: Type.String({
		description:
			'The namespace ID for this data set. This is the first path element of all its object IDs.'
	}),
	description: Type.Optional(Type.String()),
	type: UnionEnumFromRecord({
		standalone: 'A standalone ruleset.',
		expansion: 'An expansion that depends on other rulesets.'
	}),
	pkg: Type.Object({
		name: Type.String({
			description: 'The package ID, not including its scope (see `scope`).'
		}),
		scope: UnionEnumFromRecord(
			{
				[PKG_SCOPE_OFFICIAL]: 'Official Ironsworn content.',
				[PKG_SCOPE_COMMUNITY]:
					'Ironsworn-compatible content from third parties.'
			},
			{
				description: 'The namespace or scope used by the package.',
				default: PKG_SCOPE_COMMUNITY
			}
		)
	}),
	paths: Type.Object({
		source: Type.String(),
		assets: Type.Optional(Type.Array(Type.String()))
	})

	// TODO: configure more of package construction from here, e.g. content of package.json
})
export type DataPackageConfig = Static<typeof DataPackageConfig>
