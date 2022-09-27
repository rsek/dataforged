import { AlterMoveOutcomesBuilder, MoveTriggerBuilder } from "@builders";
import type { AlterMove, AlterMoveOutcomes, AssetAbility, Move, MoveTrigger , YamlAlterMove } from "@schema";
import { formatId } from "@utils";
import _ from "lodash-es";

/**
 * @internal
 */
export class AlterMoveBuilder implements AlterMove {
  $id: AlterMove["$id"];
  Moves?: Move["$id"][] | null | undefined;
  Alters?: AlterMove["$id"][] | undefined;
  Trigger?: MoveTrigger | undefined;
  Text?: string | undefined;
  Outcomes?: AlterMoveOutcomes | undefined;
  constructor(yaml: YamlAlterMove, parent: AssetAbility, index: number) {
    this.$id = formatId((index+1).toString(),parent.$id,"Alter_Moves");
    this.Alters = yaml.Alters;
    this.Moves = yaml.Moves;
    if (yaml.Trigger) {
      const triggerClone = _.cloneDeep(yaml.Trigger);
      this.Trigger = new MoveTriggerBuilder(triggerClone,  this);
    }
    this.Text = yaml.Text;
    if (yaml.Outcomes) {
      this.Outcomes = new AlterMoveOutcomesBuilder(yaml.Outcomes, this.$id);
    }
  }
}
