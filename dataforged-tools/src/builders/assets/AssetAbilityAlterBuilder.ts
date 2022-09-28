import type { AssetAbilityAlter } from "@schema";

export class AssetAbilityAlterBuilder implements AssetAbilityAlter {
  Moves?: AssetAbilityAlter["Moves"];
  Properties?: AssetAbilityAlter["Properties"];
  Momentum?: AssetAbilityAlter["Momentum"];
}