import type { IInput } from "./IInput.js";
import type { Gamespace } from "../common/Gamespace.js";
import type { InputType } from "../common/InputType.js";
import type { AssetTypeIdBase, IAssetAbility, IAssetAttachment, IAssetType, IConditionMeter, IHasAliases, IHasDisplay, IHasId, IHasName, IHasSource } from "../index.js";
import type { Tuple } from "../../utils/types/Tuple.js";
export * from "../../utils/types/Tuple.js";
/**
 * @public
 */
export declare type AssetId = `${Gamespace}/${AssetIdBase}`;
/**
 * @public
 */
export declare type AssetIdBase = `${AssetTypeIdBase}/${string}`;
/**
 * An interface representing an *Ironsworn: Starforged* asset card.
 * @public
 */
export interface IAsset extends IHasId<AssetId>, IHasName, IHasDisplay, IHasSource, Partial<IHasAliases> {
    /**
     * @example "Assets/Path/Bounty_Hunter"
     */
    $id: AssetId;
    /**
     * The asset's name - the title printed on the card.
     * @example "Bounty Hunter"
     */
    Name: string;
    /**
     * The ID of the asset's parent AssetType
     * @example "Assets/Path"
     */
    "Asset Type": IAssetType["$id"];
    /**
     * Details on what attachments (other assets) are accepted by this asset.
     */
    Attachments?: IAssetAttachment | undefined;
    /**
     * Data describing the Input controls that should be embedded in the card. Inputs embedded in specific asset abilities appear as keys of the corresponding ability object, instead.
     */
    Inputs?: IInput<InputType>[] | undefined;
    /**
     * An optional markdown string representing the requirement text that appears at the top of some asset cards.
     * @markdown
     * @example "If you wear your finely crafted set of personal armor..."
     */
    Requirement?: string | undefined;
    /**
     * The asset's abilities.
     */
    Abilities: Tuple<IAssetAbility, 3>;
    /**
     * Information on this asset's condition meter, if any.
     */
    "Condition Meter"?: IConditionMeter | undefined;
}
//# sourceMappingURL=IAsset.d.ts.map