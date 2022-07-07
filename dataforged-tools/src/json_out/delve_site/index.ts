import type { IHasDescription, IHasDisplay, IHasName, IHasSource, IHasSummary, IRow } from "@json_out/index.js";

/**
 * @public
 */
export type DelveCardType = "Theme" | "Domain";

/**
 * Shared interface describing site Themes and site Domains from *Ironsworn: Delve*.
 * @public
 */
export interface IDelveCard extends IHasName, IHasSource, IHasSummary, Partial<IHasDisplay>, Partial<IHasDescription> {
  /**
   * Indicates whether this is a site Theme or a site Domain.
   */
  Type: DelveCardType;
  /**
   * The summary that appears on the card.
   * @markdown
   */
  Summary: string;
  /**
   * An optional extended description for this card that doesn't appear on the card itself.
   * @markdown
   */
  Description: string;
  /**
   * The Features that this card contributes. Effectively a 'partial' oracle table; combine with the features of another card to complete it.
   */
  Features: IRow[];
  /**
   * The Dangers that this card contributes. Effectively a 'partial' oracle table; combine with the dangers of another card and the Reveal a Danger move oracle table to complete it.
   */
  Dangers: IRow[];
}

/**
 * @public
 */
export interface IDelveDomain extends IDelveCard {
  Type: "Domain"
  /**
   * The Features that this Domain card contributes. Effectively a 'partial' oracle table; combine with the features of a Theme card to complete it.
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
   * The Dangers that this Domain contributes. Effectively a 'partial' oracle table; combine with the dangers of Theme and the Reveal a Danger move oracle table to complete it.
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
 * @public
 */
export interface IDelveTheme extends IDelveCard {
  Type: "Theme"
  /**
   * The Features that this Theme card contributes. Effectively a 'partial' oracle table; combine with the features of a Domain card to complete it.
   */
  Features: [
    IRow & {Floor: 1, Ceiling: 4},
    IRow & {Floor: 5, Ceiling: 8},
    IRow & {Floor: 9, Ceiling: 12},
    IRow & {Floor: 13, Ceiling: 16},
    IRow & {Floor: 17, Ceiling: 20},
  ],
  /**
   * The Dangers that this Theme contributes. Effectively a 'partial' oracle table; combine with the dangers of Domain and the Reveal a Danger move oracle table to complete it.
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