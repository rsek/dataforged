import { type Static } from '@sinclair/typebox'
import * as Utils from 'base-types/common/utils'

export const ProgressTypeCommon = Utils.StringEnum(
	['combat_progress', 'vow_progress', 'scene_challenge_progress'],
	{ $id: '#/$defs/ProgressType' }
)

export type ProgressTypeCommon = Static<typeof ProgressTypeCommon>
