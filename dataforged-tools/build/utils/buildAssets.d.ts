import { Gamespace } from "../schema_json";
import { AssetTypeBuilder } from "../builders";
/**
 * Build and validate all asset objects from YAML.
 * @returns An array of Asset objects.
 */
export declare function buildAssets(gamespace?: Gamespace): {
    [x: string]: AssetTypeBuilder;
};
//# sourceMappingURL=buildAssets.d.ts.map