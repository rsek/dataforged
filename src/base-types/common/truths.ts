import { Type } from '@sinclair/typebox'
import * as Localize from 'base-types/common/localize'
import * as Metadata from 'base-types/common/metadata'
import * as Abstract from 'base-types/common/abstract'

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
