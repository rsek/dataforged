import { Type } from '@sinclair/typebox'
import * as Localize from 'base-types/common/localize'
import * as Abstract from 'base-types/common/abstract'
import * as Enum from 'base-types/common/enum'
import { Squash } from 'base-types/common/utils'

export const EncounterLike = Type.Object({
	name: Type.Ref(Localize.Label),
	rank: Type.Ref(Enum.ChallengeRank),
	description: Type.Ref(Localize.MarkdownString)
})

export const EncounterBase = Squash([
	Abstract.Cyclopedia,
	EncounterLike,
	Type.Object({
		drives: Type.Array(Type.Ref(Localize.MarkdownString)),
		tactics: Type.Array(Type.Ref(Localize.MarkdownString)),
		quest_starter: Type.Ref(Localize.MarkdownString)
	})
])
