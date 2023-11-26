import { TypeCompiler } from '@sinclair/typebox/compiler'
import { Datasworn } from '../../schema/datasworn/Root.js'

const { $schema, $id, $defs, ...root } = Datasworn

const OutputValidator = TypeCompiler.Compile(root, Object.values($defs))

export default OutputValidator
