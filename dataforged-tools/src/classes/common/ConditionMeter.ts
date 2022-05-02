import type { AssetType } from "@classes/assets/AssetType.js";
import { MeterBase } from "@classes/common/MeterBase.js";
import { MeterAlias } from "@json_out/index.js";
import type { IConditionMeter, MeterCondition } from "@json_out/index.js";
import type { IAssetYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export class ConditionMeter extends MeterBase implements IConditionMeter {
  // set by parent constructor
  $id!: IConditionMeter["$id"];
  // set by parent constructor
  Name!: string;
  // set by parent constructor
  Max!: number;
  Min!: 0;
  "Value": number;
  Conditions: MeterCondition[] = [];
  Aliases?: MeterAlias[] | undefined;
  constructor(json: NonNullable<IAssetYaml["Condition Meter"]>, id: string, assetType: AssetType["$id"]) {
    super(json, id);
    this["Value"] = json["Value"] ?? json.Max;
    if (json.Conditions) {
      this.Conditions = json.Conditions;
    }
    if (assetType === "Starforged/Assets/Companion" || assetType === "Ironsworn/Assets/Companion") {
      this.Aliases = [MeterAlias.CompanionHealth];
    }
    if (assetType === "Starforged/Assets/Command_Vehicle") {
      this.Aliases = [ MeterAlias.CommandVehicleIntegrity, MeterAlias.VehicleIntegrity ];
    }
    if (assetType === "Starforged/Assets/Support_Vehicle") {
      this.Aliases = [
        MeterAlias.SupportVehicleIntegrity, MeterAlias.VehicleIntegrity
      ];
    }
  }
}

