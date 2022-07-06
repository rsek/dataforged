//License: MIT
export var RollMethod;
(function (RollMethod) {
    /**
     * When rolling with this move trigger option, *every* stat or progress track of the `Using` key is rolled.
     */
    RollMethod["All"] = "All";
    /**
     * When rolling with this move trigger option, use the highest/best option from the `Using` key.
     */
    RollMethod["Highest"] = "Highest";
    /**
     * When rolling with this move trigger option, use the lowest/worst option from the `Using` key.
     */
    RollMethod["Lowest"] = "Lowest";
    /**
     * When rolling with this move trigger option, the user picks which stat to use.
     *
     * This is the default option for triggers that offer a single stat.
     */
    RollMethod["Any"] = "Any";
    /**
     * This move trigger option has no roll method of its own, and must inherit its roll from another move trigger option.
     *
     * If the parent's `Using` is defined, the inherited roll must use one of those stats/progress tracks.
     *
     * Typically appears on children of `IAlterMove`.
     */
    RollMethod["Inherit"] = "Inherit";
    /**
     * The move trigger option results in an automatic strong hit - no roll required.
     */
    RollMethod["StrongHit"] = "Strong Hit";
    /**
     * The move trigger option results in an automatic weak hit - no roll required.
     */
    RollMethod["WeakHit"] = "Weak Hit";
})(RollMethod || (RollMethod = {}));
/**
 * @public
 */
export var RollType;
(function (RollType) {
    RollType["Action"] = "Action roll";
    RollType["Progress"] = "Progress roll";
    // TODO: add 'Any'?
})(RollType || (RollType = {}));
//# sourceMappingURL=RollMethod.js.map