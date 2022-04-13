import { Asset, SourceInheritor } from "@classes/index.js";
import type { AssetTypeName } from "@json_out/assets/AssetTypeName.js";
import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { AssetTypeId, AssetTypeIdFragment, IAssetType, IDisplay, ISource } from "@json_out/index.js";
import { badJsonError } from "@utils/logging/badJsonError.js";
import type { RequireKey } from "@utils/types/RequireKey.js";
import { validateColor } from "@utils/validateColor.js";
import type { IAssetTypeYaml } from "@yaml_in/assets/IAssetTypeYaml.js";

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
  constructor(json: IAssetTypeYaml, gamespace: Gamespace, rootSource: ISource) {
    super(json.Source ?? {}, rootSource);
    this.$id = `${gamespace}/Assets/${json.Name.replaceAll(" ", "_") as AssetTypeIdFragment}`;
    this.Name = json.Name;
    this.Aliases = json.Aliases;
    this.Description = json.Description;
    this.Display = json.Display ?? {};
    if (this.Display.Color && !validateColor(this.Display.Color)) {
      throw badJsonError(this.constructor, this.Display, "Not a valid color!");
    }
    if (!this.Display.Title) {
      this.Display.Title = this.Name + "s";
    }
    this.Assets = json.Assets.map(asset => new Asset(asset, gamespace, this));
  }
}

