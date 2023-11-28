import { TypeCompiler } from '@sinclair/typebox/compiler'
import { Datasworn } from '../../schema/datasworn/Root.js'
import { TSchema } from '@sinclair/typebox'

const { $schema, $id, $defs, ...root } = Datasworn

const OutputValidator = TypeCompiler.Compile(
	root as TSchema,
	Object.values($defs) as TSchema[]
)

export default OutputValidator

