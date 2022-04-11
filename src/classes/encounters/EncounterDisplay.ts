import type { IDisplay } from "@json_out/index.js";

/**
 * @internal
 */
export class EncounterDisplay implements IDisplay {
  Title: string;
  constructor(json: Partial<IDisplay>, parentName: string) {
    this.Title = json.Title ?? parentName;
  }
}