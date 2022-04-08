import type { MoveCategoryName } from "@dataforged/constants/MoveCategoryName.js";

type MoveId = `Moves / ${MoveCategoryName} / ${string}`; export { MoveId };

export type MoveIdGeneric = "Moves / *";
