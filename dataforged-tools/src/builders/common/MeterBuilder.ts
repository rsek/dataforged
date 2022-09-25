import type { Meter , YamlMeter } from "@schema";

/**
 * Class representing a meter (Starforged) or status track (Ironsworn).
 * @internal
 */
export abstract class MeterBuilder implements Meter {
  $id: string;
  Label: string;
  Min: number = 0;
  Max: number;
  Value: number = 0;
  Rollable: boolean;
  /**
   * @param json - the json object to build the counter from
   * @param id - the id of the Counter
   */
  constructor(json: YamlMeter, id: string) {
    this.$id = id;
    this.Label = json.Label;
    this.Max = json.Max;
    this.Min = json.Min ?? 0;
    this["Value"] = json["Value"] ?? 0;
    this.Rollable = json.Rollable ?? false;
  }
}