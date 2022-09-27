import type { HasId, RollTemplate, YamlRollTemplate } from "@schema";
import { formatId } from "@utils";

/**
 * @internal
 */
export class RollTemplateBuilder implements RollTemplate {
  $id: string;
  Result?: string | undefined;
  Summary?: string | undefined;
  Description?: string | undefined;
  constructor(yaml: YamlRollTemplate, parent: HasId) {
    this.$id = formatId("roll template", parent.$id);
    this.Result = yaml.Result;
    this.Summary = yaml.Summary;
    this.Description = yaml.Description;
  }
}