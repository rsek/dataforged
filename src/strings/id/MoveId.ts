import type MoveCategoryName from "@dataforged/constants/MoveCategoryName.js";

type MoveId = `Moves / ${MoveCategoryName} / ${string}`; export default MoveId;

export type MoveIdGeneric = "Moves / *";
