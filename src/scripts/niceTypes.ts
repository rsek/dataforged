import Codegen from '@sinclair/typebox-codegen'
import Defs from '../schema/datasworn/Defs.js'
import fs from 'fs-extra'
import { mapValues } from 'lodash-es'
import {
	TDiscriminatedUnion,
	TUnionEnum,
	ToEnum,
	ToUnion
} from '../schema/datasworn/Utils.js'
import { TSchema, TypeClone, TypeGuard } from '@sinclair/typebox'
// import { CompilerOptions, ScriptTarget } from 'typescript'
// import { shellify } from '../shellify.js'

// const ff: CompilerOptions = {
// 	strict: true,
// 	outDir: 'test',
// 	target: ScriptTarget.ES2015,
// 	declaration: true
// }

// shellify({
// 	command: 'tsc',
// 	args: ['json-typedef/typescript/index.ts']
// })

function simplifyRecursive(schema: TSchema) {
	const base = TypeClone.Type(schema)
	switch (true) {
		case TypeGuard.TUnion(schema): {
			base.anyOf = base.anyOf.map(simplifyRecursive)
			break
		}
		case TypeGuard.TIntersect(schema): {
			base.allOf = base.allOf.map(simplifyRecursive)
			break
		}
		case TDiscriminatedUnion(schema): {
			const base = ToUnion(schema as any)
			base.anyOf = base.anyOf?.map(simplifyRecursive)
			return base
		}
		case TUnionEnum(schema):
			return ToEnum(schema as any)
		case TypeGuard.TObject(schema): {
			base.properties = mapValues(base.properties, simplifyRecursive)
			break
		}
		case TypeGuard.TArray(schema): {
			base.items = simplifyRecursive(base.items)
			break
		}
		case TypeGuard.TRecord(schema): {
			base.patternProperties = mapValues(
				base.patternProperties,
				simplifyRecursive
			)
			break
		}
	}

	return base
}

const adjustedDefs = mapValues(Defs, simplifyRecursive)

const exports: Codegen.TypeBoxModel['exports'] = new Map(
	Object.entries(adjustedDefs)
)
exports.set('uri')

const model: Codegen.TypeBoxModel = {
	exports,
	types: Object.values(adjustedDefs)
}

const result = Codegen.ModelToTypeScript.Generate(model)

const prepend = `
function format(type: string,value: string) {
  switch (type) {
    default:
	    return true
  }
}

`

await fs.writeFile('tb-test.ts', prepend + result)
