import type { Gamespace } from "@json_out/common/Gamespace.js";

export type AssetTypeIdFragment = "Command_Vehicle" | "Companion" | "Deed" | "Module" | "Path" | "Support_Vehicle";

export type AssetTypeId = `${Gamespace}/${AssetTypeIdBase}`;

export type AssetTypeIdBase = `Assets/${AssetTypeIdFragment}`;
