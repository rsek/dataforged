import type { MultipleRolls } from "@schema";


/**
 * Represents "Roll twice" and "Roll three times" oracle results.
 * @internal
 */
export class MultipleRollsBuilder implements MultipleRolls {
  Amount: number;
  "Allow duplicates": boolean;
  "Make it worse": boolean;
  constructor(json: Partial<MultipleRolls>) {
    this.Amount = json.Amount ?? 2;
    this["Allow duplicates"] = json["Allow duplicates"] ?? false;
    this["Make it worse"] = json["Make it worse"] ?? false;
  }
}
