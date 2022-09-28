import type { ChallengeRank, EncounterClassic, HasDescription, HasId, HasSource, HasSummary, HasTitle, OracleTableRow } from '@schema/json'

/**
 * @public
 */
export enum DelveCardType {
  Theme = 'theme',
  Domain = 'domain'
};

/**
 * Interface describing common characteristics of themes and domains from *Ironsworn: Delve*.
 *
 * Together, the theme and domain help you visualize your exploration of the site, and provide oracle tables for features and dangers.
 *
 * @see DelveSiteTheme
 * @see DelveSiteDomain
 * @public
 */
export interface DelveCard extends HasSource, HasSummary, HasDescription, HasId, HasTitle {
  /**
   * @pattern ^ironsworn/(themes|domains)/[a-z_-]+$
   */
  $id: string
  /**
   * Indicates whether this is a site Theme or a site Domain.
   */
  'Card type': DelveCardType
  /**
   * The summary text that appears immediately below the card's title. For best rendering, ensure that it fits on a single line.
   * @markdown
   * @localize
   */
  Summary: string
  /**
   * An extended description for this card that doesn't appear on the card itself. For 'canonical' Themes and Domains, these are presented on p. 84 - 93 of *Ironsworn: Delve*.
   *
   * Most are two paragraphs long, approximately 90 words (600 characters); the longest 'canonical' description clocks in at 98 words (619 characters). Allot space accordingly.
   *
   * @markdown
   * @localize
   */
  Description: string
  /**
   * The Features contributed by this card. Effectively a 'partial' oracle table; combine with the features of another card to complete it.
   */
  Features: OracleTableRow[]
  /**
   * The Dangers contributed by this card. Effectively a 'partial' oracle table; combine with the dangers of another card and the Reveal a Danger move oracle table to complete it.
   */
  Dangers: OracleTableRow[]
}

/**
 * Interface describing a delve site domain.
 *
 * The **domain** represents the physical characteristics of the site—the terrain or architecture you must traverse.
 *
 * Together, the theme and domain help you visualize your exploration of the site, and provide oracle tables for features and dangers.
 *
 * @see DelveSiteTheme
 * @public
 */
export interface DelveSiteDomain extends DelveCard {
  /**
   * @pattern ^ironsworn/domains/[a-z_-]+$
   */
  $id: string
  'Card type': DelveCardType.Domain
  /**
   * The Features contributed by this Domain card. Effectively a 'partial' oracle table; combine with the features of a Theme card to complete it.
   */
  Features: [
    OracleTableRow & { Floor: 21, Ceiling: 43 },
    OracleTableRow & { Floor: 44, Ceiling: 56 },
    OracleTableRow & { Floor: 57, Ceiling: 64 },
    OracleTableRow & { Floor: 65, Ceiling: 68 },
    OracleTableRow & { Floor: 69, Ceiling: 72 },
    OracleTableRow & { Floor: 73, Ceiling: 76 },
    OracleTableRow & { Floor: 77, Ceiling: 80 },
    OracleTableRow & { Floor: 81, Ceiling: 84 },
    OracleTableRow & { Floor: 85, Ceiling: 88 },
    OracleTableRow & { Floor: 89, Ceiling: 98, Result: 'Something unusual or unexpected' },
    OracleTableRow & { Floor: 99, Ceiling: 99, Result: 'You transition into a new theme' },
    OracleTableRow & { Floor: 100, Ceiling: 100, Result: 'You transition into a new domain' },
  ]
  /**
   * The Dangers contributed by this Domain card. Effectively a 'partial' oracle table; combine with the dangers of Theme and the Reveal a Danger move oracle table to complete it.
   */
  Dangers: [
    OracleTableRow & { Floor: 31, Ceiling: 33 },
    OracleTableRow & { Floor: 34, Ceiling: 36 },
    OracleTableRow & { Floor: 37, Ceiling: 39 },
    OracleTableRow & { Floor: 40, Ceiling: 42 },
    OracleTableRow & { Floor: 43, Ceiling: 45 },
  ]
}
/**
 * Interface describing a delve site theme.
 *
 * The **theme** represents the condition or state of the site, and indicates the kinds of denizens and threats you might find there.
 *
 * Together, the theme and domain help you visualize your exploration of the site, and provide oracle tables for features and dangers.
 *
 * @see DelveSiteDomain
 * @public
 */
export interface DelveSiteTheme extends DelveCard {
  /**
   * @pattern ^ironsworn/themes/[a-z_-]+$
   */
  $id: string
  'Card type': DelveCardType.Theme
  /**
   * The Features contributed by this Theme card. Effectively a 'partial' oracle table; combine with the features of a Domain card to complete it.
   */
  Features: [
    OracleTableRow & { Floor: 1, Ceiling: 4 },
    OracleTableRow & { Floor: 5, Ceiling: 8 },
    OracleTableRow & { Floor: 9, Ceiling: 12 },
    OracleTableRow & { Floor: 13, Ceiling: 16 },
    OracleTableRow & { Floor: 17, Ceiling: 20 },
  ]
  /**
   * The Dangers contributed by this Theme card.  Effectively a 'partial' oracle table; combine with the dangers of Domain and the Reveal a Danger move oracle table to complete it.
   */
  Dangers: [
    OracleTableRow & { Floor: 1, Ceiling: 5 },
    OracleTableRow & { Floor: 6, Ceiling: 10 },
    OracleTableRow & { Floor: 11, Ceiling: 12 },
    OracleTableRow & { Floor: 13, Ceiling: 14 },
    OracleTableRow & { Floor: 15, Ceiling: 16 },
    OracleTableRow & { Floor: 17, Ceiling: 18 },
    OracleTableRow & { Floor: 19, Ceiling: 20 },
    OracleTableRow & { Floor: 21, Ceiling: 22 },
    OracleTableRow & { Floor: 23, Ceiling: 24 },
    OracleTableRow & { Floor: 25, Ceiling: 26 },
    OracleTableRow & { Floor: 27, Ceiling: 28 },
    OracleTableRow & { Floor: 29, Ceiling: 30 },
  ]
}

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
  Rarity: keyof typeof DelveDenizenRarities
  Encounter: EncounterClassic['$id']
}
/**
 * @alpha
 */
export interface DelveSite extends HasSource, HasDescription, HasTitle {
  Rank: ChallengeRank
  Theme: [DelveSiteTheme['$id']] | [DelveSiteTheme['$id'], DelveSiteTheme['$id']]
  Domain: [DelveSiteDomain['$id']] | [DelveSiteDomain['$id'], DelveSiteDomain['$id']]
  Denizens: [
    DelveMatrixCell & { Floor: 1, Ceiling: 27, Rarity: 'Very common', Summary: string },
    DelveMatrixCell & { Floor: 28, Ceiling: 41, Rarity: 'Common', Summary: string },
    DelveMatrixCell & { Floor: 42, Ceiling: 55, Rarity: 'Common', Summary: string },
    DelveMatrixCell & { Floor: 56, Ceiling: 69, Rarity: 'Common', Summary: string },
    DelveMatrixCell & { Floor: 70, Ceiling: 75, Rarity: 'Uncommon', Summary: string },
    DelveMatrixCell & { Floor: 76, Ceiling: 81, Rarity: 'Uncommon', Summary: string },
    DelveMatrixCell & { Floor: 82, Ceiling: 87, Rarity: 'Uncommon', Summary: string },
    DelveMatrixCell & { Floor: 88, Ceiling: 93, Rarity: 'Uncommon', Summary: string },
    DelveMatrixCell & { Floor: 94, Ceiling: 95, Rarity: 'Rare', Summary: string },
    DelveMatrixCell & { Floor: 96, Ceiling: 97, Rarity: 'Rare', Summary: string },
    DelveMatrixCell & { Floor: 98, Ceiling: 99, Rarity: 'Rare', Summary: string },
    DelveMatrixCell & { Floor: 100, Ceiling: 100, Rarity: 'Unforeseen', Summary: string },
  ]
}
