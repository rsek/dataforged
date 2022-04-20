/**
 * The type of an attribute set by a Select Input.
 * @public
 */
export var InputSelectOptionType;
(function (InputSelectOptionType) {
    /**
     * A reference to one of the player character's stats: Edge, Heart, Iron, Shadow, or Wits.
     * @see {@link Stat}
     */
    InputSelectOptionType["Stat"] = "Stat";
    /**
     * A reference to one of the player character's condition meters: Health, Spirit, or Supply.
     * @see {@link ConditionMeterName}
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
