import type { Asset , AssetAbility, AssetAttachment, AssetState, ConditionMeter, HasId, OmitMetadataDeep } from "@schema";
import type { PartialDeep } from "@utils";

/**
 * Describes changes that an asset ability makes to its parent asset when active. Any properties with object values should be merged recursively.
 *
 * @example An `AssetAlterProperties` that would set `Asset["Condition Meter"].Max` to 3, and leave its other properties unchanged:
 * ```json
 * { "Condition meter": { "Max": 3 } }
 * ```
 * @public
 */
export interface AssetAlterProperties extends Omit<PartialDeep<OmitMetadataDeep<Asset>>,"Abilities"|
"Attachments"|"Condition meter"|"$id">, HasId {
  $id: string;
  Abilities?: AssetAlterPropertiesAbility[] | undefined;
  Attachments?: AssetAlterPropertiesAttachment | undefined;
  "Condition meter"?: AssetAlterPropertiesConditionMeter | undefined;
  States?: AssetState[] | undefined;
}
/**
 * @public
 */
export interface AssetAlterPropertiesAttachment extends Partial<AssetAttachment> {}
/**
 * @public
 */
export interface AssetAlterPropertiesAbility extends Partial<AssetAbility> {}
/**
 * @public
 */
export interface AssetAlterPropertiesConditionMeter extends Partial<ConditionMeter> {}