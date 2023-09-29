import { Type } from '@sinclair/typebox'
import * as Localize from 'schema/common/localize'
import * as Abstract from 'schema/common/abstract'
import { Progress } from 'schema/common'

export const EncounterLike = Type.Object({
	name: Type.Ref(Localize.Label),
	nature: Type.Ref(Localize.Label),
	rank: Type.Ref(Progress.ChallengeRank),
	description: Type.Ref(Localize.MarkdownString)
})

export const EncounterBase = Abstract.Cyclopedia({
	...EncounterLike.properties,
	drives: Type.Array(Type.Ref(Localize.MarkdownString)),
	tactics: Type.Array(Type.Ref(Localize.MarkdownString)),
	quest_starter: Type.Ref(Localize.MarkdownString)
})
