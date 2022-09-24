import { AssetStateBuilder } from "@builders";
import type { AssetAlterProperties } from "@schema_json";
import { formatId } from "@utils";
import type { YamlAssetAlterProperties } from "@schema_yaml";

export class AssetAlterPropertiesBuilder implements AssetAlterProperties {
  $id: string;
  Abilities?: AssetAlterProperties["Abilities"];
  Attachments?: AssetAlterProperties["Attachments"];
  "Condition Meter"?: AssetAlterProperties["Condition Meter"];
  States?: AssetAlterProperties["States"];
  constructor(json: YamlAssetAlterProperties, parentId: string) {
    this.$id = formatId("Alter Properties", parentId);
    this.Abilities = json.Abilities;
    this.Attachments = json.Attachments;
    this["Condition Meter"] = json["Condition Meter"];
    if (json.States) {
      this.States = json.States.map(state => new AssetStateBuilder(state, this));
    }
  }
}