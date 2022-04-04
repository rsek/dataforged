import { writeFileSync } from "fs";
import renderMoveCategory from "./md/renderMoveCategory.js";
import { transformMoveLinks } from "./md/transformHyperlink.js";
import type MoveCategory from "../types/moves/MoveCategory.js";

/**
 * It takes in a list of move categories, and writes a markdown file with all of the move categories and their moves.
 * @param {MoveCategory[]} data - MoveCategory[]
 * @param {string} mdPath - The path to the directory where the markdown files are stored.
 */
export default function buildMoveMarkdown(data: MoveCategory[], mdPath: string) {
  const allMoveText = [
    "# Starforged Moves",
    data.map(moveCat => renderMoveCategory(moveCat, 2))
  ].flat(2).join("\n\n");

  writeFileSync(mdPath + "moves.md", transformMoveLinks(allMoveText, true) + "\n", { encoding: "utf-8" });
}