import { Type } from '@sinclair/typebox'
import { Localize, Metadata } from '../common/index.js'

export type DelveSiteCardType = 'theme' | 'domain'
export type DelveSiteCardRowType = 'feature' | 'danger'
export const DelveCardMixin = Type.Object({
	summary: Type.Ref(Localize.MarkdownString),
	description: Type.Optional(Type.Ref(Localize.MarkdownString)),
	icon: Type.Optional(Type.Ref(Metadata.SVGImageURL))
})
