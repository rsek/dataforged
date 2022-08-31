/**
 * The type of an attribute set by a Select Input.
 * @public
 */
export var InputSelectOptionType;
(function (InputSelectOptionType) {
    /**
     * A reference to one of the player character's stats: edge, heart, iron, shadow, or wits.
     * @see {@link Stat}
     */
    InputSelectOptionType["Stat"] = "Stat";
    /**
     * A reference to one of the player character's condition meters (Starforged) or status tracks (Ironsworn): health, spirit, or supply.
     * @see {@link PlayerConditionMeter}
     */
    InputSelectOptionType["ConditionMeter"] = "Condition Meter";
    /**
     * An arbitrary pre-set string value.
     */
    InputSelectOptionType["String"] = "String";
    /**
     * A arbitrary pre-set number value.
     */
    InputSelectOptionType["Number"] = "Number";
})(InputSelectOptionType || (InputSelectOptionType = {}));
//# sourceMappingURL=IInputSelect.js.map