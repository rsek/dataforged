import type { IDisplayWithTitle } from "@json_out/index.js";

/**
 * @internal
 * @deprecated Use `Title` on the parent object instead.
 */
export class EncounterDisplay implements IDisplayWithTitle {
  Title: string;
  constructor(json: Partial<IDisplayWithTitle>, parentName: string) {
    this.Title = json.Title ?? parentName;
  }
}