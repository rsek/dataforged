export class AssetSelectInput implements IAssetSelectInput {
  Name: string;
  Type: string;
  // TODO: use enums or other typing instead
  Options: string[];
  constructor(json: IAssetSelectInput) {
    this.Name = json.Name;
    this.Type = json.Type;
    this.Options = json.Options;
  }
}

export interface IAssetSelectInput {
  Name: string;
  Type: string;
  Options: string[];
}
