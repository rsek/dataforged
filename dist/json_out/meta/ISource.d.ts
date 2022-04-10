/**
 * Enumerates valid sourcebook titles.
 */
export declare enum SourceTitle {
    Starforged = "Ironsworn: Starforged Rulebook",
    StarforgedBackerPreview = "Starforged Backer Preview",
    StarforgedAssets = "Ironsworn: Starforged Assets",
    Ironsworn = "Ironsworn Rulebook",
    IronswornDelve = "Ironsworn: Delve",
    IronswornAssets = "Ironsworn Assets",
    IronswornBonusAssets = "Ironsworn Bonus Assets (July 2020)"
}
/**
 * Enumerates valid source URLs.
 */
export declare enum SourceUrl {
    IronswornBonusAssets = "https://drive.google.com/file/d/1bWyWxJzV_SVtyE_SeEGS4TMJ1ZBHfrdv/view",
    IronswornRulebook = "https://www.ironswornrpg.com/downloads"
}
/**
 * Interface representing data on the game's source.
 */
export interface ISource {
    /**
     * The title of the source.
     */
    Title: SourceTitle;
    /**
     * The 6-number date string formatted as `MMDDYY`. Relevant only during Starforged development; it will be deprecated once the game is released.
     */
    Date?: string | undefined;
    /**
     * The page on which the item appears most prominently.
     */
    Page?: number | undefined;
}
//# sourceMappingURL=ISource.d.ts.map