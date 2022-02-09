export interface ICounter {
  Name: string;
  Max?: number;
}

export class Counter implements ICounter {
  $id: string;
  Name: string;
  Max?: number;
  "Starts At" = 0;
  constructor(json: ICounter, id: string) {
    this.Name = json.Name;
    this.$id = id;
    if (json.Max) {
      this.Max = json.Max;
    }
  }
}