import { AlterMoveOutcomesBuilder , MoveTriggerBuilder } from "@builders";
import type { AlterMove, AlterMoveOutcomes, AssetAbility , Move, MoveTrigger } from "@schema_json";
import type { YamlAlterMove } from "@schema_yaml";
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
  constructor(json: YamlAlterMove, parent: AssetAbility, index: number) {
    this.$id = formatId((index+1).toString(),parent.$id,"Alter_Moves");
    this.Alters = json.Alters;
    this.Moves = json.Moves;
    if (json.Trigger) {
      const triggerClone = _.cloneDeep(json.Trigger);
      this.Trigger = new MoveTriggerBuilder(triggerClone,  this);
    }
    this.Text = json.Text;
    if (json.Outcomes) {
      this.Outcomes = new AlterMoveOutcomesBuilder(json.Outcomes, this.$id);
    }
  }
}
