import { Datasworn as DataswornBuilder } from '../../builders/datasworn.js'
import { transform } from '../../builders/transformer.js'
import type * as Generic from '../../schema/datasworn/Generic.js'
import type { In, Out } from '../../types/index.js'

/** Builds from the contents of a single YAML or JSON file */
export async function buildRulesetData(sourceData: In.Datasworn) {
	const builtData = transform<In.Datasworn, Out.Datasworn, unknown>(
		sourceData,
		sourceData.id as string,
		sourceData as In.Datasworn & Generic.SourcedNode,
		DataswornBuilder as any
	)

	return builtData
}
