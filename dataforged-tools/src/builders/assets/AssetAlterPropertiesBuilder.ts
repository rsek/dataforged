import { AssetStateBuilder } from "@builders";
import type { AssetAlterProperties , YamlAssetAlterProperties } from "@schema";
import { formatId } from "@utils";

export class AssetAlterPropertiesBuilder implements AssetAlterProperties {
  $id: string;
  Abilities?: AssetAlterProperties["Abilities"];
  Attachments?: AssetAlterProperties["Attachments"];
  "Condition meter"?: AssetAlterProperties["Condition meter"];
  States?: AssetAlterProperties["States"];
  constructor(yaml: YamlAssetAlterProperties, parentId: string) {
    this.$id = formatId("Alter Properties", parentId);
    this.Abilities = yaml.Abilities;
    this.Attachments = yaml.Attachments;
    this["Condition meter"] = yaml["Condition meter"];
    if (yaml.States) {
      this.States = yaml.States.map(state => new AssetStateBuilder(state, this));
    }
  }
}