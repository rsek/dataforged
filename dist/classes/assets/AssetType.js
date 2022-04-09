import { Asset } from "../../../dist/classes/assets/Asset.js";
import { SourceInheritor } from "../../../dist/classes/common/SourceInheritor.js";
import { badJsonError } from "../../../dist/utils/logging/badJsonError.js";
import { validateColor } from "../../../dist/utils/validateColor.js";
export class AssetType extends SourceInheritor {
    constructor(json, rootSource) {
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
//# sourceMappingURL=AssetType.js.map