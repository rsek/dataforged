import { type Node } from 'src/types/abstract'

export type ID = string
export default interface Asset extends Node {
  _id: ID
}

export interface Extend extends Partial<Asset> {}
