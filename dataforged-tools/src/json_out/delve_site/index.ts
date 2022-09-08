import type { ChallengeRank, IEncounterIronsworn, IHasDescription, IHasId, IHasSource, IHasSummary, IHasTitle , IRow } from "@json_out/index.js";
import { ISource } from "@json_out/index.js";
import type { YamlStub } from "@yaml_in/index.js";

/**
 * @public
 */
export enum DelveCardType {
  Theme = "Theme",
  Domain = "Domain"
};

/**
 * Interface describing common characteristics of themes and domains from *Ironsworn: Delve*.
 *
 * Together, the theme and domain help you visualize your exploration of the site, and provide oracle tables for features and dangers.
 *
 * @see IDelveTheme
 * @see IDelveDomain
 * @public
 */
export interface IDelveCard extends IHasSource, IHasSummary, IHasDescription, IHasId, IHasTitle {
  /**
   * @pattern ^Ironsworn/(Themes|Domains)/[A-z_-]+$
   */
  $id: string
  /**
   * Indicates whether this is a site Theme or a site Domain.
   */
  Type: DelveCardType;
  /**
   * The summary text that appears immediately below the card's title. For best rendering, ensure that it fits on a single line.
   * @markdown
   * @localize
   */
  Summary: string;
  /**
   * An extended description for this card that doesn't appear on the card itself. For 'canonical' Themes and Domains, these are presented on p. 84 - 93 of *Ironsworn: Delve*.
   *
   * Most are two paragraphs long, approximately 90 words (600 characters); the longest 'canonical' description clocks in at 98 words (619 characters). Allot space accordingly.
   *
   * @markdown
   * @localize
   */
  Description: string;
  /**
   * The Features contributed by this card. Effectively a 'partial' oracle table; combine with the features of another card to complete it.
   */
  Features: IRow[];
  /**
   * The Dangers contributed by this card. Effectively a 'partial' oracle table; combine with the dangers of another card and the Reveal a Danger move oracle table to complete it.
   */
  Dangers: IRow[];
}

/**
 * Interface describing a delve site domain.
 *
 * The **domain** represents the physical characteristics of the site—the terrain or architecture you must traverse.
 *
 * Together, the theme and domain help you visualize your exploration of the site, and provide oracle tables for features and dangers.
 *
 * @see IDelveTheme
 * @public
 */
export interface IDelveDomain extends IDelveCard {
  /**
   * @pattern ^Ironsworn/Domains/[A-z_-]+$
   */
  $id: string
  Type: DelveCardType.Domain
  /**
   * The Features contributed by this Domain card. Effectively a 'partial' oracle table; combine with the features of a Theme card to complete it.
   */
  Features: [
    IRow & {Floor: 21, Ceiling: 43},
    IRow & {Floor: 44, Ceiling: 56},
    IRow & {Floor: 57, Ceiling: 64},
    IRow & {Floor: 65, Ceiling: 68},
    IRow & {Floor: 69, Ceiling: 72},
    IRow & {Floor: 73, Ceiling: 76},
    IRow & {Floor: 77, Ceiling: 80},
    IRow & {Floor: 81, Ceiling: 84},
    IRow & {Floor: 85, Ceiling: 88},
    IRow & {Floor: 89, Ceiling: 98, Result: "Something unusual or unexpected"},
    IRow & {Floor: 99, Ceiling: 99, Result: "You transition into a new theme"},
    IRow & {Floor: 100, Ceiling: 100, Result: "You transition into a new domain" },
  ];
  /**
   * The Dangers contributed by this Domain card. Effectively a 'partial' oracle table; combine with the dangers of Theme and the Reveal a Danger move oracle table to complete it.
   */
  Dangers: [
    IRow & {Floor: 31, Ceiling: 33},
    IRow & {Floor: 34, Ceiling: 36},
    IRow & {Floor: 37, Ceiling: 39},
    IRow & {Floor: 40, Ceiling: 42},
    IRow & {Floor: 43, Ceiling: 45},
  ]
}
/**
 * Interface describing a delve site theme.
 *
 * The **theme** represents the condition or state of the site, and indicates the kinds of denizens and threats you might find there.
 *
 * Together, the theme and domain help you visualize your exploration of the site, and provide oracle tables for features and dangers.
 *
 * @see IDelveDomain
 * @public
 */
export interface IDelveTheme extends IDelveCard {
  /**
   * @pattern ^Ironsworn/Themes/[A-z_-]+$
   */
  $id: string
  Type: DelveCardType.Theme
  /**
   * The Features contributed by this Theme card. Effectively a 'partial' oracle table; combine with the features of a Domain card to complete it.
   */
  Features: [
    IRow & {Floor: 1, Ceiling: 4},
    IRow & {Floor: 5, Ceiling: 8},
    IRow & {Floor: 9, Ceiling: 12},
    IRow & {Floor: 13, Ceiling: 16},
    IRow & {Floor: 17, Ceiling: 20},
  ],
  /**
   * The Dangers contributed by this Theme card.  Effectively a 'partial' oracle table; combine with the dangers of Domain and the Reveal a Danger move oracle table to complete it.
   */
  Dangers: [
    IRow & {Floor: 1, Ceiling: 5},
    IRow & {Floor: 6, Ceiling: 10},
    IRow & {Floor: 11, Ceiling: 12},
    IRow & {Floor: 13, Ceiling: 14},
    IRow & {Floor: 15, Ceiling: 16},
    IRow & {Floor: 17, Ceiling: 18},
    IRow & {Floor: 19, Ceiling: 20},
    IRow & {Floor: 21, Ceiling: 22},
    IRow & {Floor: 23, Ceiling: 24},
    IRow & {Floor: 25, Ceiling: 26},
    IRow & {Floor: 27, Ceiling: 28},
    IRow & {Floor: 29, Ceiling: 30},
  ]
}

export enum DelveDenizenRarities {
  "Very common"=27,
  "Common"=14,
  "Uncommon"=5,
  "Rare"=2,
  "Unforeseen"=1
}

export interface IDelveMatrixRow extends IRow {
  Rarity: keyof typeof DelveDenizenRarities
  Encounter: IEncounterIronsworn["$id"]
}

export interface IDelveSite extends IHasSource, IHasDescription {
  Name: string
  Rank: ChallengeRank;
  Theme: [IDelveTheme["$id"]] | [IDelveTheme["$id"],IDelveTheme["$id"]];
  Domain: [IDelveDomain["$id"]] | [IDelveDomain["$id"],IDelveDomain["$id"]];
  Denizens: [
    IDelveMatrixRow & {Floor: 1, Ceiling: 27, Rarity: "Very common", Summary: string},
    IDelveMatrixRow & {Floor: 28, Ceiling: 41, Rarity: "Common", Summary: string},
    IDelveMatrixRow & {Floor: 42, Ceiling: 55, Rarity: "Common", Summary: string},
    IDelveMatrixRow & {Floor: 56, Ceiling: 69, Rarity: "Common", Summary: string},
    IDelveMatrixRow & {Floor: 70, Ceiling: 75, Rarity: "Uncommon", Summary: string},
    IDelveMatrixRow & {Floor: 76, Ceiling: 81, Rarity: "Uncommon", Summary: string},
    IDelveMatrixRow & {Floor: 82, Ceiling: 87, Rarity: "Uncommon", Summary: string},
    IDelveMatrixRow & {Floor: 88, Ceiling: 93, Rarity: "Uncommon", Summary: string},
    IDelveMatrixRow & {Floor: 94, Ceiling: 95, Rarity: "Rare", Summary: string},
    IDelveMatrixRow & {Floor: 96, Ceiling: 97, Rarity: "Rare", Summary: string},
    IDelveMatrixRow & {Floor: 98, Ceiling: 99, Rarity: "Rare", Summary: string},
    IDelveMatrixRow & {Floor: 100, Ceiling: 100, Rarity: "Unforeseen", Summary: string},
  ]
}

export interface IDelveSiteYaml extends YamlStub<IDelveSite, "", "Denizens"> {}