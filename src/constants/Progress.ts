

export enum LegacyType {
    Quests = "Quests",
    Bonds = "Bonds",
    Discoveries = "Discoveries"
}
export enum TrackType {
    Combat = "Combat",
    Vow = "Vow",
    Expedition = "Expedition",
    Connection = "Connection",
    SceneChallenge = "Scene Challenge"
}
export type ProgressType = LegacyType | TrackType;
