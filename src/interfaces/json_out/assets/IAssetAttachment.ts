import type AssetTypeId from "@dataforged/strings/id/AssetTypeId.js";

export default interface IAssetAttachment {
  "Asset Type": AssetTypeId;
  "Max": number | undefined;
}