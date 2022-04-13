import type { AssetType } from "@classes/assets/AssetType.js";
import { MeterBase } from "@classes/common/MeterBase.js";
import type { AssetConditionMeterId } from "@json_out/assets/index.js";
import { MeterAlias } from "@json_out/common/index.js";
import type { IConditionMeter, MeterCondition } from "@json_out/common/index.js";


/**
 * @internal
 */
export class ConditionMeter extends MeterBase implements IConditionMeter {
  // set by parent constructor
  $id!: AssetConditionMeterId;
  // set by parent constructor
  Name!: string;
  // set by parent constructor
  Max!: number;

  Min!: 0;
  "Starting Value": number;
  Conditions: MeterCondition[] = [];
  Aliases?: MeterAlias[] | undefined;
  constructor(json: IConditionMeter, id: string, assetType: AssetType["$id"]) {
    super(json, id);
    this["Starting Value"] = json["Starting Value"] ?? json.Max;
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

