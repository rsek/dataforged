import type { IMeter } from "@json_out/index.js";
import type { YamlStub } from "@yaml_in/index.js";

/**
 * Class representing a counter embedded in a Starforged Asset.
 * @internal
 */
export abstract class Meter implements IMeter {
  $id: string;
  Label: string;
  Min: number = 0;
  Max: number;
  Value: number = 0;
  Rollable!: boolean;
  /**
   * @param json - the json object to build the counter from
   * @param id - the id of the Counter
   */
  constructor(json: YamlStub<IMeter, "Min"|"Value">, id: string) {
    this.$id = id;
    this.Label = json.Label;
    this.Max = json.Max;
    this.Min = json.Min ?? 0;
    this["Value"] = json["Value"] ?? 0;
  }
}