import { TypeCompiler } from '@sinclair/typebox/compiler'
import { DataswornSource } from '../../schema/datasworn/Root.js'


const SourceValidator = TypeCompiler.Compile(
	DataswornSource,
	Object.values(DataswornSource.$defs)
)

export default SourceValidator
