

import type { ICounter } from "./Counter.js";
import { Counter } from "./Counter.js";
import type AssetId from "../assets/AssetId.js";
import type AssetTypeId from "../assets/AssetTypeId.js";

export type MeterType = "Momentum" | PcConditionMeter;
export type PcConditionMeter = "Health" | "Spirit" | "Supply";
export type AssetConditionMeterType = "Asset Condition Meter" | `${AssetId} / Condition Meter`;
export type ConditionMeterType = PcConditionMeter | AssetConditionMeterType;

export enum MeterCondition {
  Battered = "Battered",
  Cursed = "Cursed",
  OutOfAction = "Out of Action",
}

export enum MeterAlias {
  CompanionHealth = "Companion Health",
  VehicleIntegrity = "Vehicle Integrity",
  CommandVehicleIntegrity = "Command Vehicle Integrity",
  SupportVehicleIntegrity = "Support Vehicle Integrity",
  IncidentalVehicleIntegrity = "Incidental Vehicle Integrity",
}

export class ConditionMeter extends Counter implements IConditionMeter {
  // set by parent constructor
  $id!: AssetConditionMeterType;
  Name!: string;
  Max!: number;
  Min = 0;
  "Starting Value": number;
  Conditions?: MeterCondition[] | undefined;
  Aliases?: MeterAlias[] | undefined;
  constructor(json: IConditionMeter, id: string, assetType: AssetTypeId) {
    super(json, id);
    this["Starting Value"] = json["Starting Value"] ?? json.Max;
    if (json.Conditions) {
      this.Conditions = json.Conditions;
    }
    if (assetType === "Assets / Companion") {
      this.Aliases = [MeterAlias.CompanionHealth];
    }
    if (assetType === "Assets / Command Vehicle") {
      this.Aliases = [ MeterAlias.CommandVehicleIntegrity, MeterAlias.VehicleIntegrity ];
    }
    if (assetType === "Assets / Support Vehicle") {
      this.Aliases = [
        MeterAlias.SupportVehicleIntegrity, MeterAlias.VehicleIntegrity
      ];
    }
  }
}

export interface IConditionMeter extends ICounter {
  Name: string;
  Conditions?: MeterCondition[];
  "Starting Value"?: number;
  Max: number;
}
