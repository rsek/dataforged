import type { AssetIdBase } from "@json_out/assets/AssetId.js";
import type { Gamespace } from "@json_out/common/Gamespace.js";

export type AssetAbilityId = `${Gamespace}/${AssetAbilityIdBase}`;

export type AssetAbilityIdBase = `${AssetIdBase}/Abilities/${number}`;