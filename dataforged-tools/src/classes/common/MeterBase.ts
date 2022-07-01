//License: MIT
import type { IMeterBase } from "@json_out/index.js";
import type { YamlStub } from "@yaml_in/index.js";

/**
 * Class representing a counter embedded in a Starforged Asset.
 * @internal
 */
export abstract class MeterBase implements IMeterBase {
  $id: string;
  Name: string;
  Min: number = 0;
  Max: number;
  "Value": number = 0;
  /**
   * @param json - the json object to build the counter from
   * @param id - the id of the Counter
   */
  constructor(json: YamlStub<IMeterBase, "Min"|"Value">, id: string) {
    this.$id = id;
    this.Name = json.Name;
    this.Max = json.Max;
    this.Min = json.Min ?? 0;
    this["Value"] = json["Value"] ?? 0;
  }
}