import type { IHasId, IRollTemplate } from "@json_out/index.js";
import type { IRollTemplateYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export class RollTemplate implements IRollTemplate {
  $id: string;
  Result?: string | undefined;
  Summary?: string | undefined;
  Description?: string | undefined;
  constructor(json: IRollTemplateYaml, parent: IHasId) {
    this.$id = `${parent.$id}/Roll_template`;
    this.Result = json.Result;
    this.Summary = json.Summary;
    this.Description = json.Description;
  }
}