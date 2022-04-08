import type { IDisplay } from "@dataforged/interfaces/json_out/common/IDisplay.js";

export default class EncounterDisplay implements IDisplay {
  Title: string;
  constructor(json: Partial<IDisplay>, parentName: string) {
    this.Title = json.Title ?? parentName;
  }
}