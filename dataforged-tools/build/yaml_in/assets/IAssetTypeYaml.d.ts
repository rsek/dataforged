import type { IAssetType } from "../../json_out/assets/IAssetType.js";
import type { StubBy } from "../../utils/types/Stub.js";
import type { IAssetYaml } from "../index.js";
export interface IAssetTypeYaml extends StubBy<IAssetType, "Source", "Assets" | "$id"> {
    Assets: IAssetYaml[];
}
//# sourceMappingURL=IAssetTypeYaml.d.ts.map