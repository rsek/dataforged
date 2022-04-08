import type { AssetTypeId } from "@dataforged/strings/id/AssetTypeId.js";

export interface IAssetAttachment {
  "Asset Type": AssetTypeId;
  "Max": number | undefined;
}