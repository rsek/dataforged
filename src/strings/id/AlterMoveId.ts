import type { AssetAbilityId } from "@dataforged/strings/id/AssetAbilityId.js";
import type { MoveIdGeneric } from "@dataforged/strings/id/MoveId.js";
import type { MoveId } from "@dataforged/strings/id/MoveId.js";

export type AlterMoveId = `${AssetAbilityId} / Alter ${MoveId | MoveIdGeneric}`;
