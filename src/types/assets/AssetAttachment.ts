import t from 'ts-runtime/lib';
import AssetType from "./AssetType";

export default interface IAssetAttachment {
  "Asset Type": AssetType;
  "Max": number | undefined;
}