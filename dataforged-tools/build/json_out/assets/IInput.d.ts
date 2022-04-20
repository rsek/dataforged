import type { ClockSegments } from "../common/ClockSegments.js";
import type { Gamespace } from "../common/Gamespace.js";
import type { AssetAbilityIdBase, AssetIdBase, ClockType, IHasId, IHasName, InputType } from "../index.js";
/**
 * @public
 */
export declare type InputId = `${Gamespace}/${IdBase}`;
/**
 * @public
 */
export declare type IdBase = `${AssetAbilityIdBase | AssetIdBase}/Inputs/${string}`;
/**
 * A stub interface representing an input widget of any type.
 * @see {@link IInputNumber}, {@link IInputClock}, {@link IInputText}, {@link IInputSelect}
 * @public
 */
export interface IInput<T extends InputType> extends IHasId<InputId>, IHasName {
    "Input Type": T;
    /**
     * Whether the input's value is expected to change over the course of a campaign. For example, name fields are typically `false`, while something like a clock or tally would be `true`.
     *
     * It's a good idea to make everything editable regardless, but this property might inform whether your UI presents that functionality "front and center" or as a secondary interaction (via long press, right click, etc);
     */
    Adjustable: boolean;
}
/**
 * An input where the user sets an integer.
 * Suggested rendering: a number input spinner, similar to `<input type='number'>` in HTML.
 * @see {@link InputType.Number}
 * @public
 */
export interface IInputNumber extends IInput<InputType.Number> {
    Min: number;
    Max: number | null;
    Step: 1;
    "Value": number;
}
/**
 * An input representing an *Ironsworn: Starforged* clock.
 * @seePage 239
 * @see {@link InputType.Clock}
 * @public
 */
export interface IInputClock extends IInput<InputType.Clock> {
    /**
     * Whether the clock is a Tension Clock or a Campaign Clock. For assets this doesn't really matter since they have their own specific trigger conditions, and can probably be ignored.
     */
    "Clock Type": ClockType;
    /**
     * An integer representing the total number of segments in this Clock. *Ironsworn: Starforged* uses clocks with 4, 6, 8, and 10 segments.
     *
     * `Filled` should not exceed this number.
     */
    Segments: ClockSegments;
    /**
     * An integer representing how many filled segments this clock has. This is always 0 in Dataforged; it's included to make it easy to store clock states with the same interface.
     */
    Filled: number;
}
/**
 * A text input.
 * Suggested rendering: a single-line text input, similar to `<input type='text'>` in HTML.
 * @see {@link InputType.Text}
 * @public
 */
export interface IInputText extends IInput<InputType.Text> {
}
//# sourceMappingURL=IInput.d.ts.map