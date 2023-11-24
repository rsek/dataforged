import path from 'path'
import fs from 'fs-extra'
import * as JTD from 'jtd'
import { log } from '../scripts/utils/logger.js'
import { toJtdRoot } from './utils.js'

import { Datasworn } from '../schema/datasworn/index.js'
import { PKG_NAME } from '../scripts/const.js'
import { ShellCommandParams, shellify } from '../shellify.js'

const JTD_ROOT = path.join(process.cwd(), 'src', 'json-typedef')
const JTD_TYPES_ROOT = path.join(JTD_ROOT, 'out')
const JTD_JSON_PATH = path.join(JTD_TYPES_ROOT, 'datasworn.jtd.json')

const root: JTD.Schema = toJtdRoot(Datasworn)

const referenceNames = new Set<string>()

function crawlForRefs(schema: Record<string, unknown>) {
	for (const [key, value] of Object.entries(schema)) {
		if (Array.isArray(value)) continue
		if (key === 'ref' && typeof value === 'string') referenceNames.add(value)
		if (typeof value === 'object')
			crawlForRefs(value as Record<string, unknown>)
	}
}

crawlForRefs(root as Record<string, unknown>)

for (const name of referenceNames)
	if (!(name in root?.definitions)) log.info(`Missing definition for ${name}`)

const json = JSON.stringify(root, undefined, '\t')
const filePath = JTD_JSON_PATH

fs.writeFile(filePath, json).then(() => {
	if (!JTD.isValidSchema(root))
		throw Error(
			`Wrote to ${filePath}, but it\'s not a valid JSON Typedef schema`
		)
})

type JtdOptions = {
	/** Namespace for C# + System.Text.Json generated types */
	csharpSystemTextNamespace: string
	/** Output directory for C# + System.Text.Json code generation */
	csharpSystemTextOut: string
	/** Output directory for Go code generation */
	goOut: string
	/** Package for Go generated types */
	goPackage: string
	/** Output directory for Java + Jackson code generation */
	javaJacksonOut: string
	/** Package for Java + Jackson generated types */
	javaJacksonPackage: string
	/**
	 * Format for diagnostic messages
	 * @default 'pretty'
	 */
	logFormat: 'pretty' | 'minimal' | 'json'
	/** Output directory for Python code generation */
	pythonOut: string
	/** Desired "root" name of generated code */
	rootName: string
	/** Module for Ruby generated types */
	rubyModule: string
	/** Output directory for Ruby code generation */
	rubyOut: string
	/** Module for Ruby Signatures generated types */
	rubySigModule: string
	/** Output directory for Ruby Signatures code generation */
	rubySigOut: string
	/** Output directory for Rust code generation */
	rustOut: string
	/** Output directory for TypeScript code generation */
	typescriptOut: string
}
const params: ShellCommandParams<'jtd-codegen', [string], JtdOptions> = {
	command: 'jtd-codegen',
	args: [JTD_JSON_PATH],
	options: {
		rootName: 'Ruleset',
		logFormat: 'pretty',
		csharpSystemTextNamespace: PKG_NAME,
		csharpSystemTextOut: path.join(JTD_TYPES_ROOT, 'csharp-system-text'),
		goOut: path.join(JTD_TYPES_ROOT, 'go'),
		goPackage: PKG_NAME,
		javaJacksonOut: path.join(JTD_TYPES_ROOT, 'java-jackson'),
		javaJacksonPackage: PKG_NAME,
		pythonOut: path.join(JTD_TYPES_ROOT, 'python'),
		rubyModule: PKG_NAME,
		rubyOut: path.join(JTD_TYPES_ROOT, 'ruby'),
		rubySigModule: PKG_NAME,
		rubySigOut: path.join(JTD_TYPES_ROOT, 'ruby-sig'),
		rustOut: path.join(JTD_TYPES_ROOT, 'rust'),
		typescriptOut: path.join(JTD_TYPES_ROOT, 'typescript')
	}
}

const paths = Object.entries(params.options)
	.filter(([k, v]) => k.endsWith('Out'))
	.map(([k, v]) => v)

// flush old files

await Promise.all(paths.map(fs.emptyDir))

shellify(params)
