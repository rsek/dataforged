import type IMoveOutcome from "./interfaces/IMoveOutcome.js";
import type { IHasId } from "../general/Id.js";
import type MdString from "../general/MdString.js";

export default class MoveOutcome implements IMoveOutcome, Omit<IHasId, "Name"> {
  $id: string;
  Text: MdString;
  "With a Match"?: MoveOutcome | undefined;
  constructor(json: IMoveOutcome, id: string) {
    this.$id = id;
    this.Text = json.Text;
    if (json["With a Match"]) {
      this["With a Match"] = new MoveOutcome(json["With a Match"], `${this.$id} / With a Match`);
    }
  }
}
