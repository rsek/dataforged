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
  constructor(json: YamlTitle, parent: HasId) {
    if (!json ?? !json.Canonical) {
      throw new Error(`Missing canonical title for ${parent.$id}:\n${JSON.stringify(parent)}`);
    }
    this.$id = formatId("Title", parent.$id);
    this.Canonical = json.Canonical;
    this.Standard = json.Standard ?? json.Canonical;
    this.Short = json.Short ?? json.Standard ?? this.Canonical;
  }
}

