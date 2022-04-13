import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { MoveCategoryName } from "@json_out/index.js";

export type MoveCategoryId = `${Gamespace}/${MoveCategoryIdBase}`;

export type MoveCategoryIdBase = `Moves/${MoveCategoryName|"Assets"}`;