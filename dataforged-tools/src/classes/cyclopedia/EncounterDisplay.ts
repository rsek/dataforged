//License: MIT
import type { IDisplayWithTitle } from "@json_out/index.js";

/**
 * @internal
 */
export class EncounterDisplay implements IDisplayWithTitle {
  Title: string;
  constructor(json: Partial<IDisplayWithTitle>, parentName: string) {
    this.Title = json.Title ?? parentName;
  }
}