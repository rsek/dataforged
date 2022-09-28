/**
 * The number of ticks in a single progress box.
 * @public
 */
export const TICKS_PER_BOX = 4;
/**
 * The number of boxes in a progress track.
 * @public
 */
export const TRACK_MAX_BOXES = 10;
/**
 * The number of ticks in a progress track.
 * @public
 */
export const TRACK_MAX_TICKS = TICKS_PER_BOX * TRACK_MAX_BOXES;

/**
 * Enumerates *Ironsworn* challenge ranks.
 * @public
 */
export enum ChallengeRank {
  /**
   * Troublesome
   */
  Troublesome = 1,
  /**
   * Dangerous
   */
  Dangerous = 2,
  /**
   * Formidable
   */
  Formidable = 3,
  /**
   * Extreme
   */
  Extreme = 4,
  /**
   * Epic
   */
  Epic = 5
}

/**
 * Enumerates the amount of progress marked for a track of a given {@link ChallengeRank}, in ticks.
 */
export enum ProgressUnit {
  /**
   * 3 boxes (12 ticks)
   */
  Troublesome = 12,
  /**
   * 2 boxes (8 ticks)
   */
  Dangerous = 8,
  /**
   * 1 box (4 ticks)
   */
  Formidable = 4,
  /**
   * 2 ticks
   */
  Extreme = 2,
  /**
   * 1 tick
   */
  Epic = 1
}

/**
 * Enumerates the amount of {@link LegacyTypeStarforged|legacy} marked for a reward of the given {@link ChallengeRank}, in ticks.
 */
export enum LegacyRewardStarforged {
  /**
   * 1 tick
   */
  Troublesome = 1,
  /**
   * 2 ticks
   */
  Dangerous = 2,
  /**
   * 1 box (4 ticks)
   */
  Formidable = 4,
  /**
   * 2 boxes (8 ticks)
   */
  Extreme = 8,
  /**
   * 3 boxes (12 ticks)
   */
  Epic = 12,
}

/**
 * @public
 */
export enum ProgressTypeStarforged {
  Combat = 'combat progress',
  Vow = 'vow progress',
  Expedition = 'expedition progress',
  Connection = 'connection progress',
  SceneChallenge = 'scene challenge progress',
}

export enum LegacyTypeStarforged {
  QuestsLegacy = 'quests legacy',
  BondsLegacy = 'bonds legacy',
  DiscoveriesLegacy = 'discoveries legacy'
}

/**
 * @public
 */
export enum ProgressTypeClassic {
  Combat = 'combat progress',
  Vow = 'vow progress',
  Journey = 'journey progress',
  Delve = 'delve progress',
  SceneChallenge = 'scene challenge progress',
}

/**
 * @public
 */
export enum LegacyTypeClassic {
  BondsTrack = 'bonds track',
}

/**
 * Properties common to all track types.
 * @public
 */
export interface TrackBase {
  'Progress type': ProgressTypeStarforged | LegacyTypeStarforged | ProgressTypeClassic | LegacyTypeClassic
  /**
   * @min 0
   */
  Ticks: number;
  /**
   * @min 0
   * @max 10
   */
  Score: number;
}
/**
 * @public
 */
export interface ProgressTrack extends TrackBase {
  'Progress type': ProgressTypeStarforged | ProgressTypeClassic
  /**
   * @min 0
   * @max 40
   */
  Ticks: number;
}

/**
 * @public
 */
export interface LegacyTrackStarforged extends TrackBase {
  'Progress type': LegacyTypeStarforged;
}

export interface BondsTrackClassic extends TrackBase {
  'Progress type': LegacyTypeClassic.BondsTrack
  /**
   * @min 0
   * @max 40
   */
  Ticks: number;
}