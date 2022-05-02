import { Asset, SourceInheritor } from "../index.js";
import { badJsonError } from "../../utils/logging/badJsonError.js";
import { toIdFragment } from "../../utils/toIdFragment.js";
import { validateColor } from "../../utils/validateColor.js";
import _ from "lodash-es";
/**
 * @internal
 */
export class AssetType extends SourceInheritor {
    constructor(json, gamespace, rootSource) {
        var _a, _b, _c;
        super((_a = json.Source) !== null && _a !== void 0 ? _a : {}, rootSource);
        this.$id = `${gamespace}/Assets/${toIdFragment(json.Name)}`;
        this.Name = json.Name;
        this.Aliases = json.Aliases;
        this.Description = json.Description;
        const display = _.clone((_b = json.Display) !== null && _b !== void 0 ? _b : {});
        if (!display.Title) {
            display.Title = json.Name + "s";
        }
        this.Display = display;
        if (this.Display.Color && !validateColor(this.Display.Color)) {
            throw badJsonError(this.constructor, this.Display, "Not a valid color!");
        }
        const usage = _.clone((_c = json.Usage) !== null && _c !== void 0 ? _c : {});
        if (!usage.Shared) {
            usage.Shared = false;
        }
        this.Usage = usage;
        this.Assets = json.Assets.map(asset => new Asset(asset, gamespace, this, rootSource));
    }
}
//# sourceMappingURL=AssetType.js.map