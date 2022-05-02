import type { IAssetAbility, IAssetAttachment, IAssetState, IAssetType, IAssetUsage, IConditionMeter, IDisplayWithTitle, IHasAliases, IHasDisplay, IHasId, IHasName, IHasSource, IInputSelect, IInputText } from "../index.js";
/**
 * An interface representing an *Ironsworn: Starforged* asset card.
 * @public
 */
export interface IAsset extends IHasId, IHasName, IHasDisplay, IHasSource, Partial<IHasAliases> {
    /**
     * @example "Starforged/Assets/Path/Bounty_Hunter"
     * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+/[A-z_-]+$
     */
    $id: string;
    /**
     * The asset's name - the title printed on the card.
     * @example "Bounty Hunter"
     */
    Name: string;
    Display: IDisplayWithTitle;
    /**
     * Describes any states that the asset might have, such as "Broken". Some states may disable the asset entirely.
     */
    States?: IAssetState[] | undefined;
    /**
     * The ID of the asset's parent AssetType
     * @example "Starforged/Assets/Path"
     */
    "Asset Type": IAssetType["$id"];
    /**
     * Information on the asset's usage, such as whether its abilities are shared amongst the player characters.
     */
    Usage: IAssetUsage;
    /**
     * Details on what attachments (other assets) are accepted by this asset.
     */
    Attachments?: IAssetAttachment | undefined;
    /**
     * Data describing the Input controls that should be embedded in the card. Inputs embedded in specific asset abilities appear as keys of the corresponding ability object, instead.
     */
    Inputs?: (IInputText | IInputSelect)[] | undefined;
    /**
     * An optional markdown string representing the requirement text that appears at the top of some asset cards.
     * @markdown
     * @example "If you wear your finely crafted set of personal armor..."
     */
    Requirement?: string | undefined;
    /**
     * The asset's abilities.
     */
    Abilities: [IAssetAbility, IAssetAbility, IAssetAbility];
    /**
     * Information on this asset's condition meter, if any.
     */
    "Condition Meter"?: IConditionMeter | undefined;
    Tags?: string[] | undefined;
}
//# sourceMappingURL=IAsset.d.ts.map