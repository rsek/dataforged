import type { AssetAbilityIdBase } from "@json_out/assets/AssetAbilityId.js";
import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { MoveCategoryName } from "@json_out/index.js";

export type MoveId = `${Gamespace}/${MoveIdBase}`;

export type MoveIdBase = `Moves/${MoveCategoryName|"Assets"}/${string}` | `Moves/${AssetAbilityIdBase}/${string}`;

/**
 * Placeholder Move ID indicating that *any* move is valid. For example, an {@link IAlterMove} with this as a `Move` key can be applied to any move that meets its other requirements.
 */
export type MoveIdGeneric = `${Gamespace}/${MoveIdGenericBase}`;
export type MoveIdGenericBase = "Moves/*";