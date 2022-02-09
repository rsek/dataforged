import { Counter, ICounter } from "./Counter";

export type MeterType = "Momentum" | PcConditionMeter;
export type PcConditionMeter = "Health" | "Spirit" | "Supply";
export type AssetConditionMeterType = "Asset Condition Meter";
export type ConditionMeterType = PcConditionMeter | AssetConditionMeterType;

export enum MeterCondition {
  Battered = "Battered",
  Cursed = "Cursed",
  OutOfAction = "Out of Action",
}

export class ConditionMeter extends Counter implements IConditionMeter {
  // set by parent constructor
  Name!: string;
  Max!: number;
  Conditions?: MeterCondition[];
  constructor(json: IConditionMeter, id:string) {
    super(json, id);
    if (json.Conditions) {
      this.Conditions = json.Conditions;
    }
  }
}

export interface IConditionMeter extends ICounter {
  Name: string;
  Max: number;
  Conditions?: MeterCondition[];
  "Starts At"?: number;
}
