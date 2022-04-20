import type { IdBase } from "./IInput.js";
import type { InputSelectOptionType } from "./IInputSelect.js";
import type { Gamespace } from "../common/Gamespace.js";
import type { ConditionMeterName, IHasId, IHasName, Stat } from "../index.js";
/**
 * @see {@link IInputSelectOption}
 * @public
 */
export declare type InputSelectOptionIdBase = `${IdBase}/Options/${string}`;
/**
 * @see {@link IInputSelectOption}
 * @public
 */
export declare type InputSelectOptionId = `${Gamespace}/${InputSelectOptionIdBase}`;
/**
 * @see {@link IInputSelectOptionSetter}
 * @public
 */
export declare type InputSelectOptionSetterIdBase = `${InputSelectOptionIdBase}/${string}`;
/**
 * @see {@link IInputSelectOptionSetter}
 * @public
 */
export declare type InputSelectOptionSetterId = `${Gamespace}/${InputSelectOptionSetterIdBase}`;
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
//# sourceMappingURL=IInputSelectOption.d.ts.map