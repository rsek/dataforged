import type { AssetTypeId } from "@dataforged/json_out/index.js";

export interface IAssetAttachment {
  "Asset Type": AssetTypeId;
  "Max": number | undefined;
}