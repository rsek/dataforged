import { TypeCompiler } from '@sinclair/typebox/compiler'
import { DataswornSource } from '../../schema/datasworn/Root.js'

const { $schema, $id, $defs, ...root } = DataswornSource

const SourceValidator = TypeCompiler.Compile(root, Object.values($defs))

export default SourceValidator
