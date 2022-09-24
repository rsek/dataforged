import type { SettingTruthClassic, SettingTruthOptionClassic } from "@schema_json";
import type { YamlSettingTruthOptionClassic } from "@schema_yaml";

/**
 * @internal
 */
export class TruthOptionClassicBuilder implements SettingTruthOptionClassic {
  $id: string;
  Description: string;
  "Quest Starter": string;
  constructor(json: YamlSettingTruthOptionClassic, parent: SettingTruthClassic, index: number) {
    this.$id = parent.$id + `/${index+1}`;
    this.Description = json.Description;
    this["Quest Starter"] = json["Quest Starter"];
  }
}

