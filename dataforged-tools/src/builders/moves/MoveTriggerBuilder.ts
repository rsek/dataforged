import { MoveTriggerOptionActionBuilder, MoveTriggerOptionProgressBuilder } from "@builders";
import type { AlterMove, Move, MoveTrigger, MoveTriggerBy , MoveTriggerOptionAction, MoveTriggerOptionProgress, YamlAlterMoveTrigger, YamlMoveTrigger, YamlMoveTriggerOptionAction, YamlMoveTriggerOptionProgress } from "@schema";
import { RollType } from "@schema";
import { formatId } from "@utils";

// TODO: add ironsworn moves, or have the constructor use move data to figure it out

const progressMoves = [ "Fulfill_Your_Vow", "Forge_a_Bond", "Finish_an_Expedition", "Take_Decisive_Action", "Overcome_Destruction", "Continue_a_Legacy", "Finish_the_Scene", "Reach_Your_Destination", "Write_Your_Epilogue" ];

/**
 * @internal
 */
export class MoveTriggerBuilder implements MoveTrigger {
  $id: MoveTrigger["$id"];
  "Options"?: (MoveTriggerOptionAction|MoveTriggerOptionProgress)[] | undefined;
  Text?: string | undefined;
  By?: MoveTriggerBy | undefined;
  constructor(yaml: YamlMoveTrigger|YamlAlterMoveTrigger,parent: AlterMove|Move) {
    this.$id = formatId("Trigger", parent.$id);
    this.Text = yaml.Text;
    if (this.$id.includes("alter/moves")) {
      this.By = yaml.By ?? { Player: true, Ally: false };
    }
    if (yaml.Options) {
      let progressMove = false;
      if (parent["Progress move"] ?? (parent as AlterMove).Moves?.some(item => progressMoves.includes(item))) {
        progressMove = true;
      }
      this["Options"] = yaml.Options.map((option, index) => {
        if (!option["Roll type"]) {
          option["Roll type"] = progressMove ? RollType.Progress : RollType.Action;
        }
        if (!progressMove && (parent as AlterMove).Moves?.some(item => progressMoves.includes(item))) {
          throw Error("References a progress move, but isn't set to 'Progress roll'");
        }
        switch (option["Roll type"]) {
          case RollType.Action:
            return new MoveTriggerOptionActionBuilder(option as YamlMoveTriggerOptionAction, this, index);
          case RollType.Progress:
            return new MoveTriggerOptionProgressBuilder(option as YamlMoveTriggerOptionProgress, this, index);
          default:
            throw Error(`Unrecognized roll type in: ${JSON.stringify(option)}`);
        }
      });
    }
  }
}