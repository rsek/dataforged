import { formatIdFragment } from "@utils/toIdFragment.js";
import { JSONPath } from "jsonpath-plus";
import _ from "lodash-es";

// eslint-disable-next-line no-restricted-imports
import truths from "../../json/starforged/truths.json" assert {type: "json"};

/** extracts user-facing string keys, generates IDs for them, and returns them as a flat object */
export function extractKeyedStrings(data: object) {
  const stringKeys: string[] = ["Name", "Title", "Result",  "Summary", "Description","Text", "Features", "Drives", "Tactics", "Quest Starter", "Character"];

  const path = "$..*@string()";
  const separator = "#";
  const out: Record<string, string> = {};

  JSONPath({json: data, path,
    resultType: "all",
    wrap: true,
    callback: function ({value, parent, parentProperty}: {value: string, parent: Record<string, unknown> & {$id?: string}, parentProperty: string}, b) {
      if (
        stringKeys.includes(parentProperty)
        &&
        !parent.Page // lazy way of avoiding Source objects
      ) {
        if (!parent.$id) {
          throw new Error(`No parent ID for: "${value}"\n\n${JSON.stringify(parent)}`);
        }
        let newKey = parent.$id + separator + formatIdFragment(parentProperty);
        out[newKey] = value;
      }
    }
  }

  );

  console.log(out);
  // dump to a map object?
  // how to handle markdown?

}


extractKeyedStrings(truths);
