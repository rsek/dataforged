import type { IAssetState } from "@json_out/assets/IAssetState.js";


export class AssetState implements IAssetState {
  Name: string;
  Enabled: boolean;
  Permanent: boolean;
  "Disables asset": boolean;
  Impact: boolean;
  constructor(json: IAssetState) {
    this.Name = json.Name;
    this.Enabled = json.Enabled ?? false;
    this["Disables asset"] = json["Disables asset"] ?? false;
    this.Impact = json.Impact ?? false;
    this.Permanent = json.Permanent ?? false;
  }
}
