import Codegen from '@sinclair/typebox-codegen'
import Defs from '../schema/datasworn/Defs.js'
import fs from 'fs-extra'
import { isInteger, mapValues, omit, pick } from 'lodash-es'
import {
	TDiscriminatedUnion,
	TUnionEnum,
	ToEnum,
	ToUnion
} from '../schema/datasworn/Utils.js'
import { TSchema, Type, TypeClone, TypeGuard } from '@sinclair/typebox'
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

// current status: this generates quicktype-friendly types... but quicktype mangles TS unions pretty badly :|
// all this config/troubleshooting (which isn't complete yet!) makes
/** Simplifies JSON schema types into types that are less precise, but friendlier to code generation tools like QuickType. */
export function simplifyRecursive(schema: TSchema, allowNumberEnums = false) {
	let base = TypeClone.Type(schema)
	if (!base?.title && base?.$id) base.title = base.$id
	switch (true) {
		case TypeGuard.TLiteralNumber(base): {
			return Type.Integer(pick(base, 'description', 'title'))
		}
		case TypeGuard.TIntersect(base): {
			// this is used on DelveSite, DelveSiteDomain, and DelveSiteTheme to describe table rows with static numbers. allOf[0] is an unbounded array, while allOf[1] is a tuple.
			return simplifyRecursive({
				...pick(base, 'description', 'title'),
				...base.allOf[0]
			})
		}
		case TypeGuard.TRecord(base): {
			base.additionalProperties = Object.values(base.patternProperties)[0]
			return {
				...pick(base, 'description', 'title'),
				type: 'object',

				patternProperties: {
					'.*': Object.values(base.patternProperties)[0]
				}
			}
		}
		case TypeGuard.TUnion(base): {
			base.anyOf = base.anyOf.map(simplifyRecursive)
			return omit(base, 'required')
		}
		case TDiscriminatedUnion(base): {
			base = ToUnion(base as any)
			base.anyOf = base.anyOf?.map(simplifyRecursive)
			break
		}
		case TUnionEnum(base):
			if (base.enum.every(isInteger) && !allowNumberEnums)
				return Type.Integer(pick(base, 'description', 'title'))
			return ToEnum(base as any)
		case TypeGuard.TObject(base): {
			base.properties = mapValues(base.properties, simplifyRecursive)
			base.additionalProperties ||= false
			break
		}
		case TypeGuard.TArray(base): {
			base.items = simplifyRecursive(base.items)
			break
		}
	}

	return base
}

// const definitions = mapValues(Defs, simplifyRecursive)

// const result = {
// 	title: 'RulesPackage',

// 	anyOf: [{ $ref: 'Ruleset' }, { $ref: 'Expansion' }],
// 	definitions
// }

// const replacer = (k, v) => {
// 	if (k === '$id') return undefined
// 	if (k === '$ref' && typeof v === 'string') return '#/definitions/' + v

// 	return v
// }

// const data = JSON.stringify( result, replacer, '\t'
// )


// await fs.writeFile('simpleschema.json',data)
// const exports: Codegen.TypeBoxModel['exports'] = new Map(
// 	Object.entries(adjustedDefs)
// )

// const model: Codegen.TypeBoxModel = {
// 	exports,
// 	types: Object.values(adjustedDefs)
// }

// const result = Codegen.ModelToTypeScript.Generate(model)

// const prepend = `
// function format(type: string,value: string) {
//   switch (type) {
//     default:
// 	    return true
//   }
// }

// `

