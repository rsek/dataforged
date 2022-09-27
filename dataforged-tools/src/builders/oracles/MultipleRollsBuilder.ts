import type { MultipleRolls } from "@schema";


/**
 * Represents "Roll twice" and "Roll three times" oracle results.
 * @internal
 */
export class MultipleRollsBuilder implements MultipleRolls {
  Amount: number;
  "Allow duplicates": boolean;
  "Make it worse": boolean;
  constructor(yaml: Partial<MultipleRolls>) {
    this.Amount = yaml.Amount ?? 2;
    this["Allow duplicates"] = yaml["Allow duplicates"] ?? false;
    this["Make it worse"] = yaml["Make it worse"] ?? false;
  }
}
