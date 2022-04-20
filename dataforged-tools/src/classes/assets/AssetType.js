import { Asset, SourceInheritor } from "@classes/index.js";
import { badJsonError } from "@utils/logging/badJsonError.js";
import { validateColor } from "@utils/validateColor.js";
/**
 * @internal
 */
export class AssetType extends SourceInheritor {
    constructor(json, gamespace, rootSource) {
        var _a, _b;
        super((_a = json.Source) !== null && _a !== void 0 ? _a : {}, rootSource);
        this.$id = `${gamespace}/Assets/${json.Name.replaceAll(" ", "_")}`;
        this.Name = json.Name;
        this.Aliases = json.Aliases;
        this.Description = json.Description;
        this.Display = (_b = json.Display) !== null && _b !== void 0 ? _b : {};
        if (this.Display.Color && !validateColor(this.Display.Color)) {
            throw badJsonError(this.constructor, this.Display, "Not a valid color!");
        }
        if (!this.Display.Title) {
            this.Display.Title = this.Name + "s";
        }
        this.Assets = json.Assets.map(asset => new Asset(asset, gamespace, this, rootSource));
    }
}
