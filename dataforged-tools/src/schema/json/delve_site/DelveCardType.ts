import type { MixinDescription, MixinId, MixinSource, MixinSummary, MixinTitle, OracleTableRow } from '@schema/json'

/**
 * @public
 */

export enum DelveCardType {
  Theme = 'theme',
  Domain = 'domain'
}
;
/**
 * Interface describing common characteristics of themes and domains from *Ironsworn: Delve*.
 *
 * Together, the theme and domain help you visualize your exploration of the site, and provide oracle tables for features and dangers.
 *
 * @see DelveSiteTheme
 * @see DelveSiteDomain
 * @public
 */

export interface DelveCard extends MixinSource, MixinSummary, MixinDescription, MixinId, MixinTitle {
  /**
   * @pattern ^ironsworn/(themes|domains)/[a-z_]+$
   */
  $id: string
  /**
   * Indicates whether this is a site Theme or a site Domain.
   */
  card_type: DelveCardType
  /**
   * The summary text that appears immediately below the card's title. For best rendering, ensure that it fits on a single line.
   * @markdown
   * @localize
   */
  summary: string
  /**
   * An extended description for this card that doesn't appear on the card itself. For 'canonical' Themes and Domains, these are presented on p. 84 - 93 of *Ironsworn: Delve*.
   *
   * Most are two paragraphs long, approximately 90 words (600 characters); the longest 'canonical' description clocks in at 98 words (619 characters). Allot space accordingly.
   *
   * @markdown
   * @localize
   */
  description: string
  /**
   * The Features contributed by this card. Effectively a 'partial' oracle table; combine with the features of another card to complete it.
   */
  features: OracleTableRow[]
  /**
   * The Dangers contributed by this card. Effectively a 'partial' oracle table; combine with the dangers of another card and the Reveal a Danger move oracle table to complete it.
   */
  dangers: OracleTableRow[]
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
   * @pattern ^ironsworn/domains/[a-z_]+$
   */
  $id: string
  'card_type': DelveCardType.Domain
  /**
   * The Features contributed by this Domain card. Effectively a 'partial' oracle table; combine with the features of a Theme card to complete it.
   */
  features: [
    OracleTableRow<21, 43>,
    OracleTableRow<44, 56>,
    OracleTableRow<57, 64>,
    OracleTableRow<65, 68>,
    OracleTableRow<69, 72>,
    OracleTableRow<73, 76>,
    OracleTableRow<77, 80>,
    OracleTableRow<81, 84>,
    OracleTableRow<85, 88>,
    OracleTableRow<89, 98> & { result: 'Something unusual or unexpected' },
    OracleTableRow<99, 99> & { result: 'You transition into a new theme' },
    OracleTableRow<100, 100> & { result: 'You transition into a new domain' }
  ]
  /**
   * The Dangers contributed by this Domain card. Effectively a 'partial' oracle table; combine with the dangers of Theme and the Reveal a Danger move oracle table to complete it.
   */
  dangers: [
    OracleTableRow<31, 33>,
    OracleTableRow<34, 36>,
    OracleTableRow<37, 39>,
    OracleTableRow<40, 42>,
    OracleTableRow<43, 45>
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
   * @pattern ^ironsworn/themes/[a-z_]+$
   */
  $id: string
  'card_type': DelveCardType.Theme
  /**
   * The Features contributed by this Theme card. Effectively a 'partial' oracle table; combine with the features of a Domain card to complete it.
   */
  features: [
    OracleTableRow<1, 4>,
    OracleTableRow<5, 8>,
    OracleTableRow<9, 12>,
    OracleTableRow<13, 16>,
    OracleTableRow<17, 20>
  ]
  /**
   * The Dangers contributed by this Theme card.  Effectively a 'partial' oracle table; combine with the dangers of Domain and the Reveal a Danger move oracle table to complete it.
   */
  dangers: [
    OracleTableRow<1, 5>,
    OracleTableRow<6, 10>,
    OracleTableRow<11, 12>,
    OracleTableRow<13, 14>,
    OracleTableRow<15, 16>,
    OracleTableRow<17, 18>,
    OracleTableRow<19, 20>,
    OracleTableRow<21, 22>,
    OracleTableRow<23, 24>,
    OracleTableRow<25, 26>,
    OracleTableRow<27, 28>,
    OracleTableRow<29, 30>
  ]
}
