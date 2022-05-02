import { MoveTriggerOptionAction , MoveTriggerOptionProgress } from "@classes/moves/MoveTriggerOption.js";
import type { IAlterMove, IMove, IMoveTrigger, IMoveTriggerBy } from "@json_out/index.js";
import { RollType } from "@json_out/index.js";
import type { IAlterMoveTriggerYaml , IMoveTriggerOptionActionYaml, IMoveTriggerOptionProgressYaml, IMoveTriggerYaml } from "@yaml_in/index.js";

// TODO: add ironsworn moves, or have the constructor use move data to figure it out

const progressMoves = [ "Fulfill_Your_Vow", "Forge_a_Bond", "Finish_an_Expedition", "Take_Decisive_Action", "Overcome_Destruction", "Continue_a_Legacy", "Finish_the_Scene", "Reach_Your_Destination", "Write_Your_Epilogue" ];

/**
 * @internal
 */
export class MoveTrigger implements IMoveTrigger {
  $id: IMoveTrigger["$id"];
  "Options"?: (MoveTriggerOptionAction|MoveTriggerOptionProgress)[] | undefined;
  Text?: string | undefined;
  By?: IMoveTriggerBy | undefined;
  constructor(json: IMoveTriggerYaml|IAlterMoveTriggerYaml, id: IMoveTrigger["$id"], parent: IAlterMove|IMove) {
    this.$id = id;
    this.Text = json.Text;
    if (this.$id.includes("Alter_Moves")) {
      this.By = json.By ?? { Player: true, Ally: false };
    }
    if (json.Options) {
      let progressMove = false;
      if (parent["Progress Move"] ?? (parent as IAlterMove).Moves?.some(item => progressMoves.includes(item))) {
        progressMove = true;
      }
      this["Options"] = json.Options.map((option, index) => {
        if (!option["Roll type"]) {
          option["Roll type"] = progressMove ? RollType.Progress : RollType.Action;
        }
        if (!progressMove && (parent as IAlterMove).Moves?.some(item => progressMoves.includes(item))) {
          throw Error("References a progress move, but isn't set to 'Progress roll'");
        }
        switch (option["Roll type"]) {
          case RollType.Action:
            return new MoveTriggerOptionAction(option as IMoveTriggerOptionActionYaml, this, index);
          case RollType.Progress:
            return new MoveTriggerOptionProgress(option as IMoveTriggerOptionProgressYaml, this, index);
          default:
            throw Error(`Unrecognized roll type in: ${JSON.stringify(option)}`);
        }
      });
    }
  }
}