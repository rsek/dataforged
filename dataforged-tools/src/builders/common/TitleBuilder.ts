import type { HasId , Title, YamlTitle } from "@schema";
import { formatId } from "@utils/formatId.js";

/**
 * @internal
 */
export class TitleBuilder implements Title {
  $id: string;
  Canonical: string;
  Standard: string;
  Short: string;
  constructor(yaml: YamlTitle, parent: HasId) {
    if (!yaml ?? !yaml.Canonical) {
      throw new Error(`Missing canonical title for ${parent.$id}:\n${JSON.stringify(parent)}`);
    }
    this.$id = formatId("Title", parent.$id);
    this.Canonical = yaml.Canonical;
    this.Standard = yaml.Standard ?? yaml.Canonical;
    this.Short = yaml.Short ?? yaml.Standard ?? this.Canonical;
  }
}

