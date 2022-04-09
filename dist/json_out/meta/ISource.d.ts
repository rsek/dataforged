export declare enum SourceTitle {
    Starforged = "Ironsworn: Starforged Rulebook",
    StarforgedBackerPreview = "Starforged Backer Preview",
    StarforgedAssets = "Ironsworn: Starforged Assets",
    Ironsworn = "Ironsworn Rulebook",
    IronswornDelve = "Ironsworn: Delve",
    IronswornAssets = "Ironsworn Assets",
    IronswornBonusAssets = "Ironsworn Bonus Assets (July 2020)"
}
export declare enum SourceUrl {
    IronswornBonusAssets = "https://drive.google.com/file/d/1bWyWxJzV_SVtyE_SeEGS4TMJ1ZBHfrdv/view",
    IronswornRulebook = "https://www.ironswornrpg.com/downloads"
}
export interface ISource {
    Title: SourceTitle;
    Date?: string | undefined;
    Page?: number | undefined;
}
//# sourceMappingURL=ISource.d.ts.map