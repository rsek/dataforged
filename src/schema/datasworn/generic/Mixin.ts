import { Type } from '@sinclair/typebox'
import * as Localize from '../common/Localize.js'

export const Cyclopedia = Type.Object({
	name: Type.Ref(Localize.Label),
	features: Type.Array(Type.Ref(Localize.MarkdownString)),
	summary: Type.Optional(Type.Ref(Localize.MarkdownString)),
	description: Type.Ref(Localize.MarkdownString),
	quest_starter: Type.Ref(Localize.MarkdownString),
	your_truth: Type.Optional(Type.Ref(Localize.MarkdownString))
})
