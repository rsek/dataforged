import { Requirements } from "@dataforged/classes/common/Requirements.js";
import type { GameObjectType , IGameObject } from "@dataforged/json_out/index.js";
import { badJsonError } from "@dataforged/utils/logging/badJsonError.js";
import type { AttributeHash } from "@dataforged/utils/types/AttributeHash.js";
import type { GameObjectYaml, IRequirementsYaml } from "@dataforged/yaml_in/index.js";
import _ from "lodash-es";
import { is } from "typescript-is";

export class GameObject implements IGameObject {
  "Object type": GameObjectType;
  Requires?: Requirements | undefined;
  "Inherit rolls"?: boolean | undefined;
  constructor(json: GameObjectYaml) {
    if (!is<GameObjectType>(json["Object type"])) {
      throw badJsonError(this.constructor, json, "Invalid object type");
    }
    this["Object type"] = json["Object type"];
    // this["Inherit rolls"] = json["Inherit rolls"] ?? false;
    const requiredAttributes = _.omit(json, [ "Object type", "Inherit rolls" ]) as AttributeHash;
    if (Object.keys(requiredAttributes).length) {
      const requirements = { Attributes: requiredAttributes } as IRequirementsYaml;
      this.Requires = new Requirements(requirements);
    }
  }
}