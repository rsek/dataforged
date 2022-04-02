import type MoveCategoryName from "./MoveCategoryName.js";

type MoveId = `Moves / ${MoveCategoryName} / ${string}`; export default MoveId;

export type MoveIdGeneric = "Moves / *";
