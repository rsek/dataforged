import { OutcomeInfo } from "@classes/index.js";
import type { IAlterMoveOutcomes, IMoveOutcomes, IOutcomeInfo } from "@json_out/index.js";
import { MoveOutcome } from "@json_out/index.js";
import { formatIdFragment } from "@utils/toIdFragment.js";
import type { IAlterMoveOutcomesYaml, IMoveOutcomesYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export class MoveOutcomes implements IMoveOutcomes {
  $id: IMoveOutcomes["$id"];
  "Strong Hit": IOutcomeInfo;
  "Weak Hit": IOutcomeInfo;
  "Miss": IOutcomeInfo;
  constructor(json: IMoveOutcomesYaml, id: IMoveOutcomes["$id"]) {
    this.$id = id;
    this["Strong Hit"] = new OutcomeInfo(json["Strong Hit"], `${this.$id}/Strong_Hit`);
    this["Weak Hit"] = new OutcomeInfo(json["Weak Hit"], `${this.$id}/Weak_Hit`);
    this["Miss"] = new OutcomeInfo(json["Miss"], `${this.$id}/Miss`);
  }
}

/**
 * @internal
 */
export class AlterMoveOutcomes implements IAlterMoveOutcomes {
  $id: IMoveOutcomes["$id"];
  "Strong Hit"?: IOutcomeInfo | undefined;
  "Weak Hit"?: IOutcomeInfo | undefined;
  "Miss"?: IOutcomeInfo | undefined;
  constructor(json: IAlterMoveOutcomesYaml, id: IMoveOutcomes["$id"]) {
    this.$id = id;
    const keys = [ MoveOutcome.Strong_Hit, MoveOutcome.Weak_Hit, MoveOutcome.Miss ];
    keys.forEach(outcome => {
      if (json[outcome]) {
        this[outcome] = json[outcome] as IOutcomeInfo & {"With a Match": IOutcomeInfo};
        (this[outcome] as IOutcomeInfo).$id = `${this.$id}/${formatIdFragment(outcome)}`;
        if (this[outcome]?.["With a Match"]) {
          (this[outcome] as IOutcomeInfo & {"With a Match": IOutcomeInfo})["With a Match"].$id = (this[outcome] as IOutcomeInfo).$id +"/With_a_Match";
        }
      }
    });
  }
}