import type { AssetState, HasId } from "@schema_json";
import { formatId } from "@utils";
import type { YamlAssetState } from "@schema_yaml";

/**
 * @internal
 */
export class AssetStateBuilder implements AssetState {
  $id: string;
  Label: string;
  Enabled: boolean;
  Permanent: boolean;
  "Disables asset": boolean;
  Impact: boolean;
  constructor(json: YamlAssetState, parent: HasId) {
    this.$id = formatId(json._idFragment??json.Label, parent.$id);
    this.Label = json.Label;
    this.Enabled = json.Enabled ?? false;
    this["Disables asset"] = json["Disables asset"] ?? false;
    this.Impact = json.Impact ?? false;
    this.Permanent = json.Permanent ?? false;
  }
}
