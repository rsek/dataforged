import type { IDisplayWithTitle } from "@json_out/index.js";

/**
 * @internal
 */
export class EncounterDisplay implements IDisplayWithTitle {
  $id: string;
  Title: string;
  constructor(json: Partial<IDisplayWithTitle>, parentName: string, parentId: string,) {
    this.$id = parentId + "/Display";
    this.Title = json.Title ?? parentName;
  }
}