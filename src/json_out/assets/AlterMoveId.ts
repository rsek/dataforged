import type { AssetAbilityId , MoveId , MoveIdGeneric } from "@json_out/index.js";

export type AlterMoveId = `${AssetAbilityId} / Alter ${MoveId | MoveIdGeneric}`;
