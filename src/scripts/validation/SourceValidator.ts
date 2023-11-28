import { TypeCompiler } from '@sinclair/typebox/compiler'
import { DataswornSource } from '../../schema/datasworn/Root.js'
import { omit } from 'lodash-es'

// console.log(
// 	DataswornSource.$defs.DelveSiteDomain.properties.features.allOf[1].items[9]
// )

const SourceValidator = TypeCompiler.Compile(
	DataswornSource,
	Object.values(DataswornSource.$defs)
)


export default SourceValidator
