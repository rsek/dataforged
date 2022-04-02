
import type AssetTypeId from "./AssetTypeId.js";

export default interface IAssetAttachment {
  "Asset Type": AssetTypeId;
  "Max": number | undefined;
}