import type { MoveCategoryName } from "@json_out/index.js";

type MoveId = `Moves / ${MoveCategoryName} / ${string}`; export { MoveId };

export type MoveIdGeneric = "Moves / *";
