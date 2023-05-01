import { type Static, Type, type TSchema } from '@sinclair/typebox'

export const Label = Type.String()
export type Label = Static<typeof Label>

export const MarkdownString = Type.String()
export type MarkdownString = Static<typeof Label>

export const TemplateString = Type.String()
export type TemplateString = Static<typeof TemplateString>
