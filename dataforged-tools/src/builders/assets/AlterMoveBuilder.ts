import { AlterMoveOutcomesBuilder , MoveTriggerBuilder } from "@builders";
import type { AlterMove, AssetAbility , Move } from "@schema_json";
import { formatId } from "@utils";
import type { YamlAlterMove } from "@schema_yaml";
import _ from "lodash-es";

/**
 * @internal
 */
export class AlterMoveBuilder implements AlterMove {
  $id: AlterMove["$id"];
  Moves?: Move["$id"][] | null | undefined;
  Alters?: AlterMove["$id"][] | undefined;
  Trigger?: MoveTriggerBuilder | undefined;
  Text?: string | undefined;
  Outcomes?: AlterMoveOutcomesBuilder | undefined;
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
