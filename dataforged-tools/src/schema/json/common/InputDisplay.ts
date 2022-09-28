import type { Display } from "@schema/json/meta/Display.js";

export enum InputDisplayPosition {
  /**
   * Display as attached to the asset condition meter.
   *
   * @example Starship (*Starforged*)
   */
  ConditionMeter = "condition meter",
  /**
   * The input appears at the top of the parent element.
   *
   * For inputs whose parent is an {@link Asset}, this means immediately below the asset title, before any {@link Asset.Requirement} text.
   *
   * Typically, text inputs with an {@link Asset} parent are displayed this way.
   */
  Top = "top",
  /**
   * The input is rendered at the bottom of the parent element.
   *
   * Typically, text inputs with a {@link AssetAbility} parent are displayed this way.
   *
   * @example Ironclad (*Ironsworn*)
   * @example Blademaster (*Starforged*)
   */
  Bottom = "bottom",
  /**
   * The input is rendered to the right of the parent element.
   *
   * Usually this only occurs with things like clocks and counters who have an {@link AssetAbility} parent.
   *
   * @example Fugitive (*Starforged*)
   * @example Snub Fighter (*Starforged*)
   */
  Right = "right",
  /**
   * Indicates that (in analog play) this state is presumed active when the card is flipped face-down.
   *
   * The most practical way to indicate this in a digital format is up for debate.
   *
   * Canonically, this is only used by *Starforged* modules for "broken" -- see page 55 for more information.
   */
  Back = "back"
}

export interface InputDisplay extends Display {
  Position: InputDisplayPosition
}