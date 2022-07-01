//License: MIT
import type { IAsset } from "@json_out/index.js";
import type { PartialDeep } from "@utils/index.js";


/**
 * Describes changes that an asset ability makes to its parent asset when active. Any properties with object values should be merged recursively.
 *
 * @example An `IAssetAlterProperties` that would set `IAsset["Condition Meter"].Max` to 3, and leave its other properties unchanged:
 * ```javascript
 * { "Condition Meter": { Max: 3 } }
 * ```
 * @public
 */
export interface IAssetAlterProperties extends PartialDeep<IAsset> { }
