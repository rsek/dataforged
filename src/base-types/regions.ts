import { type Static, Type } from '@sinclair/typebox'
import { Cyclopedia } from 'base-types/abstract'
import { MarkdownString } from 'base-types/localize'

export const RegionEntry = Type.Intersect([
	Cyclopedia,
	Type.Object({ quest_starter: MarkdownString })
])

export type RegionEntry = Static<typeof RegionEntry>

export const RegionEntryID = Type.String()
export type RegionEntryID = Static<typeof RegionEntryID>
