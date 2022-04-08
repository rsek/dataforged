import type { AssetAbilityId } from "@dataforged/interfaces/json_out/index.js";
import type { MoveIdGeneric } from "@dataforged/interfaces/json_out/moves/strings/MoveId.js";
import type { MoveId } from "@dataforged/interfaces/json_out/moves/strings/MoveId.js";

export type AlterMoveId = `${AssetAbilityId} / Alter ${MoveId | MoveIdGeneric}`;
