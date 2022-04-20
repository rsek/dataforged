import { MD_PATH } from "@constants/index.js";
import type { DataforgedJsonRoot } from "@json_out/DataforgedJsonRoot";
import { buildMoveMarkdown } from "@utils/buildMoveMarkdown.js";
import { buildOracleMarkdown } from "@utils/buildOracleMarkdown.js";
/**
 * Builds markdown from a Dataforged json object.
 * @param json The root json object to build from.
 * @param mdPath The root directory to render the markdown to.
 */
export function buildMarkdown(json: DataforgedJsonRoot, mdPath: string=MD_PATH) {
  buildOracleMarkdown(json.oracles, mdPath);
  buildMoveMarkdown(json.moves, mdPath);
}
