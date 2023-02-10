import {
	type Progress,
	type Localize,
	type Encounters,
	type Oracles,
	type Metadata
} from '@base-types'
import { type Range, type Collectible } from '@base-types/abstract'

export type DelveSiteID = string
export interface DelveSite extends Collectible<DelveSiteID> {
	rank: Progress.ChallengeRank
	theme: DelveSiteThemeID
	domain: DelveSiteCardID
	denizens: [
		DelveSiteDenizen<1, 27, 'very_common'>,
		DelveSiteDenizen<28, 41, 'common'>,
		DelveSiteDenizen<42, 55, 'common'>,
		DelveSiteDenizen<56, 69, 'common'>,
		DelveSiteDenizen<70, 75, 'uncommon'>,
		DelveSiteDenizen<76, 81, 'uncommon'>,
		DelveSiteDenizen<82, 87, 'uncommon'>,
		DelveSiteDenizen<88, 93, 'uncommon'>,
		DelveSiteDenizen<94, 95, 'rare'>,
		DelveSiteDenizen<96, 97, 'rare'>,
		DelveSiteDenizen<98, 99, 'rare'>,
		DelveSiteDenizen<100, 100, 'unforeseen'>
	]
}

export type DelveSiteDenizenFrequency =
	| 'very_common'
	| 'common'
	| 'uncommon'
	| 'rare'
	| 'unforeseen'

export interface DelveSiteDenizen<
	Low extends number,
	High extends number,
	Frequency extends DelveSiteDenizenFrequency
> extends Range<Low, High> {
	frequency: Frequency
	encounter: Encounters.EncounterClassicID | null
	name?: Localize.Label
}

export type DelveSiteThemeID = string
export type DelveSiteDomainID = string

type DelveSiteCardID = DelveSiteThemeID | DelveSiteDomainID
export type DelveSiteCardType = 'theme' | 'domain'

interface DelveCardBase extends Collectible<DelveSiteCardID> {
	icon?: Metadata.Icon
	summary: Localize.MarkdownPhrase
	description?: Localize.MarkdownSentences
	card_type: DelveSiteCardType
	features: Array<FeatureOrDanger<number, number>>
	dangers: Array<FeatureOrDanger<number, number>>
}

export interface FeatureOrDanger<
	Low extends number,
	High extends number,
	Result extends string = Localize.MarkdownPhrase
> extends Oracles.OracleTableRow<Low, High, Result> {}

export interface DelveSiteTheme extends DelveCardBase {
	card_type: 'theme'
	features: [
		FeatureOrDanger<1, 4>,
		FeatureOrDanger<5, 8>,
		FeatureOrDanger<9, 12>,
		FeatureOrDanger<13, 16>,
		FeatureOrDanger<17, 20>
	]
	dangers: [
		FeatureOrDanger<1, 5>,
		FeatureOrDanger<6, 10>,
		FeatureOrDanger<11, 12>,
		FeatureOrDanger<13, 14>,
		FeatureOrDanger<15, 16>,
		FeatureOrDanger<17, 18>,
		FeatureOrDanger<19, 20>,
		FeatureOrDanger<21, 22>,
		FeatureOrDanger<23, 24>,
		FeatureOrDanger<25, 26>,
		FeatureOrDanger<27, 28>,
		FeatureOrDanger<29, 30>
	]
}

export interface DelveSiteDomain extends DelveCardBase {
	card_type: 'domain'
	features: [
		FeatureOrDanger<21, 43>,
		FeatureOrDanger<44, 56>,
		FeatureOrDanger<57, 64>,
		FeatureOrDanger<65, 68>,
		FeatureOrDanger<69, 72>,
		FeatureOrDanger<73, 76>,
		FeatureOrDanger<77, 80>,
		FeatureOrDanger<81, 84>,
		FeatureOrDanger<85, 88>,
		FeatureOrDanger<89, 98, 'Something unusual or unexpected'>,
		FeatureOrDanger<99, 99, 'You transition into a new theme'>,
		FeatureOrDanger<100, 100, 'You transition into a new domain'>
	]
	dangers: [
		FeatureOrDanger<31, 33>,
		FeatureOrDanger<34, 36>,
		FeatureOrDanger<37, 39>,
		FeatureOrDanger<40, 42>,
		FeatureOrDanger<43, 45>
	]
}
