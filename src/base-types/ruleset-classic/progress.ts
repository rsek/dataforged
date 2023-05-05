import { type Static } from '@sinclair/typebox'
import { Utils, Progress } from 'base-types/common'
import { StringEnum } from 'base-types/common/utils'

const ProgressTypeClassic = Utils.StringEnum([
	'journey_progress',
	'delve_progress',
	'bonds_progress',
	'failure_track'
])

export const ProgressType = StringEnum(
	[...Progress.ProgressTypeCommon.enum, ...ProgressTypeClassic.enum],
	{ $id: '#/$defs/ProgressType' }
)
export type ProgressType = Static<typeof ProgressType>
