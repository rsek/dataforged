import { Asset, SourceInheritor } from "@classes/index.js";
import type { AssetTypeName } from "@json_out/assets/AssetTypeName.js";
import type { AssetTypeId, IAssetType, IDisplay, ISource } from "@json_out/index.js";
import { badJsonError } from "@utils/logging/badJsonError.js";
import type { RequireKey } from "@utils/types/RequireKey.js";
import { validateColor } from "@utils/validateColor.js";


/**
 * @internal
 */
export class AssetType extends SourceInheritor implements IAssetType {
  $id: AssetTypeId;
  Name: AssetTypeName;
  Aliases?: string[] | undefined;
  Description: string;
  Assets: Asset[];
  Display: RequireKey<IDisplay, "Color">;
  constructor(json: IAssetType, rootSource: ISource) {
    super(json.Source, rootSource);
    this.$id = `Assets/${json.Name}`.replaceAll(" ", "_") as AssetTypeId;
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

