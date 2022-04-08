import Asset from "@dataforged/classes/assets/Asset.js";
import SourceInheritor from "@dataforged/classes/common/SourceInheritor.js";
import type { AssetTypeName } from "@dataforged/constants/AssetTypeName.js";
import type { AssetTypeId, IAssetType, IDisplay, ISource, ParagraphsString } from "@dataforged/interfaces/json_out/index.js";
import badJsonError from "@dataforged/utils/logging/badJsonError.js";
import type { RequireKey } from "@dataforged/utils/types/RequireKey.js";
import validateColor from "@dataforged/utils/validateColor.js";


export default class AssetType extends SourceInheritor implements IAssetType {
  $id: AssetTypeId;
  Name: AssetTypeName;
  Aliases?: string[] | undefined;
  Description: ParagraphsString;
  Assets: Asset[];
  Display: RequireKey<IDisplay, "Color">;
  constructor(json: IAssetType, rootSource: ISource) {
    super(json.Source, rootSource);
    this.$id = `Assets / ${json.Name}`;
    this.Name = json.Name;
    this.Aliases = json.Aliases;
    this.Description = json.Description;
    if (!validateColor(json.Display.Color)) {
      throw badJsonError(this.constructor, json.Display, "Not a valid color!");
    }
    this.Display = json.Display;
    if (!this.Display.Title) {
      this.Display.Title = this.Name + "s";
    }
    this.Assets = json.Assets.map(asset => new Asset(asset, this));
  }
}

