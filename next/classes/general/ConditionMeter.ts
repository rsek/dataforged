import { AssetId } from "../assets/Asset";
import { AssetType } from "../assets/AssetType";
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
  "Starts At": number;
  Conditions?: MeterCondition[] | undefined;
  Aliases?: MeterAlias[] | undefined;
  constructor(json: IConditionMeter, id: string) {
    super(json, id);
    this["Starts At"] = json["Starts At"] ?? json.Max;
    if (json.Conditions) {
      this.Conditions = json.Conditions;
    }
    if (this.$id.startsWith("Companion /")) {
      this.Aliases = [MeterAlias.CompanionHealth];
    }
    if (this.$id.startsWith("Command Vehicle /")) {
      this.Aliases = [MeterAlias.CommandVehicleIntegrity, MeterAlias.VehicleIntegrity];
    }
    if (this.$id.startsWith("Support Vehicle /")) {
      this.Aliases = [
        MeterAlias.SupportVehicleIntegrity, MeterAlias.VehicleIntegrity
      ];
    }
  }
}

export interface IConditionMeter extends ICounter {
  Name: string;
  Conditions?: MeterCondition[];
  "Starts At"?: number;
  Max: number;
}
