import type { IAssetState, IHasId } from "@json_out/index.js";
import { formatIdFragment } from "@utils/toIdFragment.js";
import type { IAssetStateYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export class AssetState implements IAssetState {
  $id: string;
  Name: string;
  Label: string;
  Enabled: boolean;
  Permanent: boolean;
  "Disables asset": boolean;
  Impact: boolean;
  constructor(json: IAssetStateYaml, parent: IHasId) {
    this.$id = parent.$id + "/" + formatIdFragment(json.Name);
    this.Name = json.Name;
    this.Label = json.Name ?? json.Label;
    this.Enabled = json.Enabled ?? false;
    this["Disables asset"] = json["Disables asset"] ?? false;
    this.Impact = json.Impact ?? false;
    this.Permanent = json.Permanent ?? false;
  }
}
