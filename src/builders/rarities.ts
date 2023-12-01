import { sourcedTransformer } from './transformer.js'
import type { Datasworn, DataswornSource } from '../types/index.js'

export const Rarity = sourcedTransformer<
	DataswornSource.Rarity,
	Datasworn.Rarity,
	null
>({})
