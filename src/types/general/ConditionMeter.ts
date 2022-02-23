import t from 'ts-runtime/lib';

import AssetId from "../assets/AssetId";
import AssetType from "../assets/AssetType";
import { Counter, ICounter } from "./Counter";

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
  constructor(json: IConditionMeter, id: string, assetType: AssetType) {
    super(json, id);
    this["Starting Value"] = json["Starting Value"] ?? json.Max;
    if (json.Conditions) {
      this.Conditions = json.Conditions;
    }
    if (assetType == "Companion") {
      this.Aliases = [MeterAlias.CompanionHealth];
    }
    if (assetType == "Command Vehicle") {
      this.Aliases = [MeterAlias.CommandVehicleIntegrity, MeterAlias.VehicleIntegrity];
    }
    if (assetType == "Support Vehicle") {
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
