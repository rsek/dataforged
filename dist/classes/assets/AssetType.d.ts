import { Asset } from "../../../dist/classes/assets/Asset.js";
import { SourceInheritor } from "../../../dist/classes/common/SourceInheritor.js";
import type { AssetTypeName } from "../../../dist/json_out/assets/AssetTypeName.js";
import type { AssetTypeId, IAssetType, IDisplay, ISource, ParagraphsString } from "../../../dist/json_out/index.js";
import type { RequireKey } from "../../../dist/utils/types/RequireKey.js";
export declare class AssetType extends SourceInheritor implements IAssetType {
    $id: AssetTypeId;
    Name: AssetTypeName;
    Aliases?: string[] | undefined;
    Description: ParagraphsString;
    Assets: Asset[];
    Display: RequireKey<IDisplay, "Color">;
    constructor(json: IAssetType, rootSource: ISource);
}
//# sourceMappingURL=AssetType.d.ts.map