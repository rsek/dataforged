import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { AssetTypeIdBase } from "@json_out/index.js";

export type AssetId = `${Gamespace}/${AssetIdBase}`;

export type AssetIdBase = `${AssetTypeIdBase}/${string}`;
