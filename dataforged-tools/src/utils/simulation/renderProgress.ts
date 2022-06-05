
import { BOXES_PER_TRACK, TICKS_PER_BOX } from "@utils/simulation/progressConstants.js";
import pkg from "colors";
const { bgWhite, black } = pkg;
import _ from "lodash-es";

export enum ProgressCharsMoon {
  "🌑" = 0,
  "🌒" = 1,
  "🌓" = 2,
  "🌔" = 3,
  "🌕" = 4
}

export enum ProgressCharsBlock {
  " " = 0,
  "▘" = 1,
  "▌" = 2,
  "▙" = 3,
  "█" = 4
}

export enum ProgressChars {
  " " = 0,
  "╱" = 1,
  "🞩" = 2,
  "🞵" = 3,
  "🞻" = 4
}

/**
 * Render a track as an ascii progress bar.
 * @param ticks - The ticks to be rendered
 */
export function renderProgress(ticks: number)  {
  const score = Math.floor(ticks / TICKS_PER_BOX);
  let bar = _.repeat(ProgressChars[TICKS_PER_BOX], score);
  if (score < 10) {
    bar += ProgressChars[ticks % TICKS_PER_BOX];
  }
  bar = _.padEnd(bar, BOXES_PER_TRACK, ProgressChars[0]);
  return black(bgWhite(bar));
}