export enum LegacyTrackType {
    Quests = "Quests",
    Bonds = "Bonds",
    Discoveries = "Discoveries"
}
export enum ProgressTrackType {
    Combat = "Combat",
    Vow = "Vow",
    Expedition = "Expedition",
    Connection = "Connection",
    SceneChallenge = "Scene Challenge"
}
export type ProgressRollType = LegacyTrackType | ProgressTrackType;
