import { type Metadata } from 'src/types'
import { type Node } from 'src/types/abstract'

// TODO: make these ruleset sensitive

export type AssetID = string

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface Asset<T extends Metadata.Ruleset> extends Node<AssetID> {}
