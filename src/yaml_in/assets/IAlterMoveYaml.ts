import type { IAlterMove } from "@dataforged/json_out/index.js";

export interface IAlterMoveYaml extends Omit<IAlterMove, "$id"> { }
