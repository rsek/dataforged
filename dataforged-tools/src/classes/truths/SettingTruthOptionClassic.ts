import type { ISettingTruthClassic, ISettingTruthOptionClassic } from "@json_out/index.js";
import type { ISettingTruthOptionClassicYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export class SettingTruthOptionClassic implements ISettingTruthOptionClassic {
  $id: string;
  Description: string;
  "Quest Starter": string;
  constructor(json: ISettingTruthOptionClassicYaml, parent: ISettingTruthClassic, index: number) {
    this.$id = parent.$id + `/${index+1}`;
    this.Description = json.Description;
    this["Quest Starter"] = json["Quest Starter"];
  }
}

