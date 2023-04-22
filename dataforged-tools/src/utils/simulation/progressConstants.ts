/**
 * The number of progress boxes in a track.
 */

export const BOXES_PER_TRACK = 10;
/**
 * The number of ticks in a progress box.
 */
export const TICKS_PER_BOX = 4;

export enum ProgressTrackType {
  Vow,
  Connection,
  Expedition,
  Combat,
  SceneChallenge
}
/**
 * Enumerates the number of ticks in one unit of progress for a progress track of a given challenge rank.
 */

export enum ProgressUnit {
  Troublesome = 12,
  Dangerous = 8,
  Formidable = 4,
  Extreme = 2,
  Epic = 1
}
