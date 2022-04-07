import type ICounter from "@dataforged/interfaces/json_out/common/ICounter.js";
import type { StubExcept } from "@dataforged/utils/types/Stub.js";

/**
 * Class representing a counter embedded in a Starforged Asset.
 */
export default class Counter implements ICounter {
  $id: string;
  Name: string;
  Min: number = 0;
  Max: number | null;
  "Starting Value": number = 0;
  /**
   * @param json - the json object to build the counter from
   * @param id - the id of the Counter
   */
  constructor(json: StubExcept<ICounter, "Name", "$id">, id: string) {
    this.$id = id;
    this.Name = json.Name;
    this.Max = json.Max ?? null;
    this.Min = json.Min ?? 0;
    this["Starting Value"] = json["Starting Value"] ?? 0;
  }
}