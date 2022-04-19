import type { ChallengeRank } from "../common/index.js";
import type { EncounterIdStarforged } from "./IEncounterStarforged.js";
import type { EncounterIdIronsworn, EncounterNatureIronsworn, EncounterNatureStarforged, EncounterTags } from "./index.js";
import type { IHasDescription, IHasDisplay, IHasId, IHasName, IHasQuestStarter, IHasSource, IHasSummary } from "../meta/IHas.js";
import type { IDisplay } from "../meta/index.js";
/**
 * Interface common to Encounter entries in *Ironsworn* and *Ironsworn: Starforged*, plus 'stubs' like IEncounterVariant.
 * @see {@link IEncounter}, {@link IEncounterVariant}
 * @public
 */
export interface IEncounterBase extends IHasDisplay<IDisplay>, IHasDescription, IHasSource, IHasName, IHasId<EncounterIdStarforged | EncounterIdIronsworn>, Partial<IHasQuestStarter & IHasSummary> {
    /**
     * @example "Starforged/Encounters/Chiton"
     */
    $id: EncounterIdStarforged | EncounterIdIronsworn;
    /**
     * @example "Chiton"
     */
    Name: string;
    /**
     * @example "Monster"
     */
    Nature: EncounterNatureStarforged | EncounterNatureIronsworn;
    /**
     * @example "Insectoid horde"
     * @markdown
     */
    Summary?: string | undefined;
    Tags?: EncounterTags[] | undefined;
    Rank: ChallengeRank;
    Features?: string[] | undefined;
    Drives?: string[] | undefined;
    Tactics?: string[] | undefined;
    /**
     * Ironsworn, p. 135: "Some NPCs include a question for you to answer. This is an opportunity to customize the NPC to your vision of the Ironlands. You can do this as you define your world or discover through play. Truths may represent an absolute fact, or merely something the people of your world believe."
     *
     * Only present in Ironsworn encounters.
     * @markdown
     */
    "Your Truth"?: string | undefined;
}
//# sourceMappingURL=IEncounterBase.d.ts.map