import type { IdBase } from "@json_out/assets/IInput.js";
import type { InputSelectOptionType } from "@json_out/assets/IInputSelect.js";
import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { ConditionMeterName, IHasId, IHasName, Stat } from "@json_out/index.js";


/**
 * @see {@link IInputSelectOption}
 * @public
 */
export type InputSelectOptionIdBase = `${IdBase}/Options/${string}`;

/**
 * @see {@link IInputSelectOption}
 * @public
 */
export type InputSelectOptionId = `${Gamespace}/${InputSelectOptionIdBase}`;

/**
 * @see {@link IInputSelectOptionSetter}
 * @public
 */
export type InputSelectOptionSetterIdBase = `${InputSelectOptionIdBase}/${string}`;

/**
 * @see {@link IInputSelectOptionSetter}
 * @public
 */
export type InputSelectOptionSetterId = `${Gamespace}/${InputSelectOptionSetterIdBase}`;

/**
 * Represents an option in an {@link IInputSelect}.
 * @public
 */
export interface IInputSelectOption<K extends string, V extends InputSelectOptionType> extends IHasId<InputSelectOptionId>, IHasName {
  /**
   * A array describing what attribute keys should be set to when this option is active. *All* items in the array should be set in this manner.
   */
  Set: IInputSelectOptionSetter<K, V>[];
}

/**
 * @public
 */
export interface IInputSelectOptionSetter<K extends string, V extends InputSelectOptionType> extends IHasId<InputSelectOptionSetterId> {
  Key: K;
  Value: V extends InputSelectOptionType.Stat ? Stat : V extends InputSelectOptionType.ConditionMeter ? ConditionMeterName : V extends InputSelectOptionType.Number ? number : string;
}
