import type { TruthClassic, TruthOptionClassic } from "@schema_json";
import type { YamlTruthOptionClassic } from "@schema_yaml";

/**
 * @internal
 */
export class TruthOptionClassicBuilder implements TruthOptionClassic {
  $id: string;
  Description: string;
  "Quest Starter": string;
  constructor(json: YamlTruthOptionClassic, parent: TruthClassic, index: number) {
    this.$id = parent.$id + `/${index+1}`;
    this.Description = json.Description;
    this["Quest Starter"] = json["Quest Starter"];
  }
}

