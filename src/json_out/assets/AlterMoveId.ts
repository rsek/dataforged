import type { AssetAbilityIdBase } from "@json_out/assets/AssetAbilityId.js";
import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { MoveIdBase, MoveIdGenericBase } from "@json_out/moves/MoveId.js";

export type AlterMoveId = `${Gamespace}/${AlterMoveIdBase}`;

export type AlterMoveIdBase = `${AssetAbilityIdBase}/Alter_${MoveIdBase | MoveIdGenericBase}`;