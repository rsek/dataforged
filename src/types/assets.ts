import { type Node } from 'src/types/abstract'

export type AssetID = string
export interface Asset extends Node<AssetID> {}

export interface Extend extends Partial<Asset> {}
