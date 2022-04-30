import type { IdBase } from "@json_out/assets/IInput.js";
import type { InputSelectOptionType } from "@json_out/assets/IInputSelect.js";
import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { IHasId, IHasName, PlayerConditionMeter, Stat } from "@json_out/index.js";


/**
 * @see {@link IInputSelectOption}
 * @internal
 * @asType string
 */
export type InputSelectOptionIdBase = `${IdBase}/Options/${string}`;

/**
 * @see {@link IInputSelectOption}
 * @internal
 * @asType string
 */
export type InputSelectOptionId = `${Gamespace}/${InputSelectOptionIdBase}`;

/**
 * @see {@link IInputSelectOptionSetter}
 * @internal
 * @asType string
 */
export type InputSelectOptionSetterIdBase = `${InputSelectOptionIdBase}/${string}`;

/**
 * @see {@link IInputSelectOptionSetter}
 * @internal
 * @asType string
 */
export type InputSelectOptionSetterId = `${Gamespace}/${InputSelectOptionSetterIdBase}`;

/**
 * Represents an option in an {@link IInputSelect}.
 * @public
 */
export interface IInputSelectOption<V extends InputSelectOptionType> extends IHasId, IHasName {
  /**
   * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+/[A-z_-]+/Inputs/[A-z_-]+/Options/[A-z_-]+$
   */
  $id: string;
  /**
   * A array describing what attribute keys should be set to when this option is active. *All* items in the array should be set in this manner.
   */
  Set: IInputSelectOptionSetter<V>[];
}

/**
 * @public
 */
export interface IInputSelectOptionSetter<V extends InputSelectOptionType> extends IHasId {
  /**
   * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+/[A-z_-]+/Inputs/[A-z_-]+/Options/[A-z_-]+/[A-z_-]+$
   */
  $id: string;
  // $id: InputSelectOptionSetterId;
  Key: string;
  Value: V extends InputSelectOptionType.Stat ? Stat : V extends InputSelectOptionType.ConditionMeter ? PlayerConditionMeter : V extends InputSelectOptionType.Number ? number : string;
}
