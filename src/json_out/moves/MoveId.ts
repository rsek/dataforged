import type { MoveCategoryName } from "@dataforged/json_out/index.js";

type MoveId = `Moves / ${MoveCategoryName} / ${string}`; export { MoveId };

export type MoveIdGeneric = "Moves / *";
