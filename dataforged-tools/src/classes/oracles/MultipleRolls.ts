import type { IMultipleRolls } from "@json_out/index.js";


/**
 * Represents "Roll twice" and "Roll three times" oracle results.
 * @internal
 */
export class MultipleRolls implements IMultipleRolls {
  Amount: number;
  "Allow duplicates": boolean;
  "Make it worse": boolean;
  constructor(json: Partial<IMultipleRolls>) {
    this.Amount = json.Amount ?? 2;
    this["Allow duplicates"] = json["Allow duplicates"] ?? false;
    this["Make it worse"] = json["Make it worse"] ?? false;
  }
}
