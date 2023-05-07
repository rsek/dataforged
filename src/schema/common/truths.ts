import { Type } from '@sinclair/typebox'
import * as Localize from 'schema/common/localize'
import * as Metadata from 'schema/common/metadata'
import * as Abstract from 'schema/common/abstract'

export const TruthOptionBase = Type.Object({
	description: Type.Ref(Localize.MarkdownString),
	quest_starter: Type.Ref(Localize.MarkdownString)
})

export const TruthBase = Abstract.SourcedNode({
	options: Type.Array(TruthOptionBase),
	icon: Type.Optional(Type.Ref(Metadata.SvgImageURL))
})
