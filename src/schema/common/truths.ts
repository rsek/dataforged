import { Type } from '@sinclair/typebox'
import * as Localize from 'schema/common/localize'
import * as Metadata from 'schema/common/metadata'
import * as Abstract from 'schema/common/abstract'

export const TruthOptionBase = Type.Object({
	description: Type.Ref(Localize.MarkdownString),
	quest_starter: Type.Ref(Localize.MarkdownString)
})

export const TruthBase = Type.Composite([
	Abstract.SourcedNode,
	Type.Object({
		name: Type.Ref(Localize.Label),
		options: Type.Array(TruthOptionBase),
		icon: Type.Optional(Type.Ref(Metadata.SvgImageURL))
	})
])
