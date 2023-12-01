import { RulesPackage as DataswornBuilder } from '../../builders/datasworn.js'
import { transform } from '../../builders/transformer.js'
import type * as Generic from '../../schema/datasworn/Generic.js'
import type * as In from '../../types/DataswornSource.js'
import type * as Out from '../../types/Datasworn.js'

/** Builds from the contents of a single YAML or JSON file */
export async function buildRulesetData(
	sourceData: DataswornSource.RulesPackage
) {
	const builtData = transform<
		DataswornSource.RulesPackage,
		Datasworn.RulesPackage,
		unknown
	>(
		sourceData,
		sourceData.id,
		sourceData as DataswornSource.RulesPackage & Generic.SourcedNode,
		DataswornBuilder as any
	)

	return builtData
}
