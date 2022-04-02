import Asset from "./Asset.js";
import type AssetTypeId from "./AssetTypeId.js";
import type AssetTypeName from "./AssetTypeName.js";
import type ICategoryBase from "./ICategoryBase.js";
import type { IAssetType } from "./interfaces/IAssetType.js";
import validateColor from "./validateColor.js";
import type { WithRequired } from "./WithRequired.js";
import badJsonError from "../../functions/logging/badJsonError.js";
import type IDisplay from "../general/IDisplay.js";
import type ISource from "../general/interfaces/ISource.js";
import type MdString from "../general/MdString.js";
import Source from "../general/Source.js";

export default class AssetType implements ICategoryBase, IAssetType {
  $id: AssetTypeId;
  Name: AssetTypeName;
  Aliases?: string[] | undefined;
  Description: MdString;
  Source: Source;
  Assets: Asset[];
  Display: WithRequired<IDisplay, "Color">;
  constructor(json: IAssetType, source: ISource) {
    this.$id = `Assets / ${json.Name}`;
    this.Name = json.Name;
    this.Aliases = json.Aliases;
    this.Description = json.Description;
    this.Source = new Source(json.Source ?? {}, source);
    if (!validateColor(json.Display.Color)) {
      throw badJsonError(this.constructor, json.Display, "Not a valid color!");
    }
    this.Display = json.Display;
    if (!this.Display.Title) {
      this.Display.Title = this.Name + "s";
    }
    this.Assets = json.Assets.map(asset => new Asset(asset, this.Source, this));
  }
}

