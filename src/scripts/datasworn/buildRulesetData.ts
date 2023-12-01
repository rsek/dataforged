import { Datasworn as DataswornBuilder } from '../../builders/datasworn.js'
import { transform } from '../../builders/transformer.js'
import type * as Generic from '../../schema/datasworn/Generic.js'
import type * as In from '../../types/DataswornSource.js'
import type * as Out from '../../types/Datasworn.js'

/** Builds from the contents of a single YAML or JSON file */
export async function buildRulesetData(sourceData: In.RulesPackage) {
	const builtData = transform<In.RulesPackage, Out.RulesPackage, unknown>(
		sourceData,
		sourceData.id,
		sourceData as In.RulesPackage & Generic.SourcedNode,
		DataswornBuilder as any
	)

	return builtData
}
