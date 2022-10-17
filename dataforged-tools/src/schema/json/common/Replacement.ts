/* eslint-disable no-template-curly-in-string */
/**
 * Standard replacement strings, used by constructors when processing the master YAML data.
 * @public
 */
export enum Replacement {
  /**
   * Replace with the ID of the nearest ancestor asset.
   */
  Asset = '${{@ASSET}}',
  /**
   * Replace with the ID of the nearest ancestor asset's condition meter.
   */
  AssetMeter = '${{@ASSET_METER}}',
  /**
   * Replace with the ID of the nearest ancestor move trigger's custom stat.
   */
  CustomStat = '${{@CUSTOM_STAT}}',
  /**
   * Replace with the ID of the nearest select option value of the Stat type
   */
  AssetSelectStat = '${{@ASSET_SELECT_STAT}}',
  /**
   * Replace with the ID of the nearest select option value of the ConditionMeter type.
   */
  AssetSelectMeter = '${{@ASSET_SELECT_METER}}',
}
