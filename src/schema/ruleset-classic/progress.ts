import { type Static } from '@sinclair/typebox'
import { Utils, Progress } from 'schema/common'
import { StringEnum } from 'schema/common/utils'

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
