/**
 * Standard replacement strings, used by constructors when processing the master YAML data.
 * @public
 */
export var Replacement;
(function (Replacement) {
    /**
     * Replace with the ID of the nearest ancestor asset.
     */
    Replacement["Asset"] = "${{@ASSET}}";
    /**
     * Replace with the ID of the nearest ancestor asset's condition meter.
     */
    Replacement["AssetMeter"] = "${{@ASSET_METER}}";
    /**
     * Replace with the ID of the nearest ancestor move trigger's custom stat.
     */
    Replacement["CustomStat"] = "${{@CUSTOM_STAT}}";
    /**
     * Replace with the ID of the nearest select option value of the Stat type
     */
    Replacement["AssetSelectStat"] = "${{@ASSET_SELECT_STAT}}";
    /**
     * Replace with the ID of the nearest select option value of the ConditionMeter type.
     */
    Replacement["AssetSelectMeter"] = "${{@ASSET_SELECT_METER}}";
})(Replacement || (Replacement = {}));
