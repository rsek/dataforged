import { ChallengeRank, DelveSiteDomain, DelveSiteTheme, EncounterClassic, MixinDescription, MixinSource, MixinTitle, OracleTableRow } from '@schema'

/**
 * @alpha
 */

export enum DelveDenizenRarities {
  'Very common' = 27,
  'Common' = 14,
  'Uncommon' = 5,
  'Rare' = 2,
  'Unforeseen' = 1
}
/**
 * @alpha
 */
export interface DelveMatrixCell extends OracleTableRow {
  rarity: keyof typeof DelveDenizenRarities
  encounter: EncounterClassic['$id']
}
/**
 * @alpha
 */
export interface DelveSite extends MixinSource, MixinDescription, MixinTitle {
  rank: ChallengeRank
  theme: [DelveSiteTheme['$id']] | [DelveSiteTheme['$id'], DelveSiteTheme['$id']]
  domain: [DelveSiteDomain['$id']] | [DelveSiteDomain['$id'], DelveSiteDomain['$id']]
  denizens: [
    DelveMatrixCell & { floor: 1, ceiling: 27, rarity: 'Very common', summary: string },
    DelveMatrixCell & { floor: 28, ceiling: 41, rarity: 'Common', summary: string },
    DelveMatrixCell & { floor: 42, ceiling: 55, rarity: 'Common', summary: string },
    DelveMatrixCell & { floor: 56, ceiling: 69, rarity: 'Common', summary: string },
    DelveMatrixCell & { floor: 70, ceiling: 75, rarity: 'Uncommon', summary: string },
    DelveMatrixCell & { floor: 76, ceiling: 81, rarity: 'Uncommon', summary: string },
    DelveMatrixCell & { floor: 82, ceiling: 87, rarity: 'Uncommon', summary: string },
    DelveMatrixCell & { floor: 88, ceiling: 93, rarity: 'Uncommon', summary: string },
    DelveMatrixCell & { floor: 94, ceiling: 95, rarity: 'Rare', summary: string },
    DelveMatrixCell & { floor: 96, ceiling: 97, rarity: 'Rare', summary: string },
    DelveMatrixCell & { floor: 98, ceiling: 99, rarity: 'Rare', summary: string },
    DelveMatrixCell & { floor: 100, ceiling: 100, rarity: 'Unforeseen', summary: string }
  ]
}
