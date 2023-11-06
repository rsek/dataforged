import { type Static, Type } from '@sinclair/typebox'

export const Term = Type.Object({
	context: Type.String(),
	value: Type.Union([Type.String(), Type.Null()]),
	source: Type.Array(Type.String()),
	markdown: Type.Boolean()
})
export type Term = Static<typeof Term>
