import type { AssetTypeId } from "@dataforged/interfaces/json_out/assets/strings/AssetTypeId.js";

export interface IAssetAttachment {
  "Asset Type": AssetTypeId;
  "Max": number | undefined;
}