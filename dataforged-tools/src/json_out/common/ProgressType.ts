/**
 * @public
 */
export enum LegacyType {
    Quests = "Quests",
    Bonds = "Bonds",
    Discoveries = "Discoveries"
}
/**
 * @public
 */
export enum ProgressTrackType {
    Combat = "Combat",
    Vow = "Vow",
    Expedition = "Expedition",
    Connection = "Connection",
    SceneChallenge = "Scene Challenge"
}
/**
 * @public
 */
export type ProgressType = LegacyType | ProgressTrackType;