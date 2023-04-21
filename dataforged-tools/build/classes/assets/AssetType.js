import { DisplayWithTitle } from "../common/Display.js";
import { Asset, SourceInheritor } from "../index.js";
import { formatIdFragment } from "../../utils/toIdFragment.js";
import _ from "lodash-es";
/**
 * @internal
 */
export class AssetType extends SourceInheritor {
    constructor(json, gamespace, rootSource) {
        var _a, _b, _c, _d, _e;
        super((_a = json.Source) !== null && _a !== void 0 ? _a : {}, rootSource);
        this.$id = `${gamespace}/Assets/${formatIdFragment(json.Name)}`;
        this.Name = json.Name;
        this.Aliases = json.Aliases;
        this.Description = json.Description;
        this.Display = new DisplayWithTitle({
            Title: (_c = (_b = json.Display) === null || _b === void 0 ? void 0 : _b.Title) !== null && _c !== void 0 ? _c : json.Name + "s",
            Color: (_d = json.Display) === null || _d === void 0 ? void 0 : _d.Color
        });
        const usage = _.clone((_e = json.Usage) !== null && _e !== void 0 ? _e : {});
        if (!usage.Shared) {
            usage.Shared = false;
        }
        this.Usage = usage;
        this.Assets = json.Assets.map(asset => new Asset(asset, gamespace, this, rootSource));
    }
}
//# sourceMappingURL=AssetType.js.map