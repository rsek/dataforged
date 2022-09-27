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
   * @param yaml - the json object to build the counter from
   * @param id - the id of the Counter
   */
  constructor(yaml: YamlMeter, id: string) {
    this.$id = id;
    this.Label = yaml.Label;
    this.Max = yaml.Max;
    this.Min = yaml.Min ?? 0;
    this["Value"] = yaml["Value"] ?? 0;
    this.Rollable = yaml.Rollable ?? false;
  }
}