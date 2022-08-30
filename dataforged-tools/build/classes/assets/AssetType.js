import { DisplayWithTitle } from "../common/Display.js";
import { Asset, SourceInheritor, Title } from "../index.js";
import { formatIdFragment } from "../../utils/toIdFragment.js";
import _ from "lodash-es";
/**
 * @internal
 */
export class AssetType extends SourceInheritor {
    constructor(json, gamespace, rootSource) {
        super(json.Source ?? {}, rootSource);
        this.$id = `${gamespace}/Assets/${formatIdFragment(json.Title.Short ?? json.Title.Canonical)}`;
        this.Name = json.Name;
        this.Aliases = json.Aliases;
        this.Description = json.Description;
        this.Display = new DisplayWithTitle({
            Title: json.Display?.Title ?? json.Title.Canonical,
            Color: json.Display?.Color
        });
        this.Title = new Title(json.Title, this.$id);
        const usage = _.clone(json.Usage ?? {});
        if (!usage.Shared) {
            usage.Shared = false;
        }
        this.Usage = usage;
        this.Assets = json.Assets.map(asset => new Asset(asset, gamespace, this, rootSource));
    }
}
//# sourceMappingURL=AssetType.js.map