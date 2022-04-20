import { MD_PATH } from "@constants/index.js";
import { buildMarkdown } from "@utils/buildMarkdown.js";
import { dataStarforged } from "src/dataStarforged.js";

buildMarkdown(dataStarforged, MD_PATH);
