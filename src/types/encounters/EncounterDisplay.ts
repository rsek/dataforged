import IDisplay from "../general/Display";

export default class EncounterDisplay implements IDisplay {
  Title: string;
  constructor(json: Partial<IDisplay>, parentName: string) {
    this.Title = json.Title ?? parentName;
  }
}