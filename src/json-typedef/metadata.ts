import { Metadata } from 'schema'
import { toJtdForm } from 'json-typedef/utils'
import { mapValues, merge, omitBy } from 'lodash'
import { Squash } from 'schema/common/utils'

const jtd = mapValues(
	omitBy(Metadata, (v, k) => k.startsWith('Suggestions') || k === 'SourceStub'),
	(v, k) => toJtdForm(v as any)
)

const Suggestions = toJtdForm(
	Squash([Metadata.SuggestionsStarforged, Metadata.SuggestionsClassic]) as any
)

export default { ...jtd, Suggestions }
