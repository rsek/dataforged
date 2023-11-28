import fs from 'fs-extra'
import path from 'path'
import { PKG_NAME } from '../const.js'
import { shellify, type ShellCommandParams } from '../../shellify.js'
import { merge } from 'lodash-es'
import { JTD_JSON_PATH, JTD_TYPES_ROOT } from './const.js'

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
		rootName: 'RulesPackage',
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
	},
	execOptions: {
		env: merge(process.env, { RUST_BACKTRACE: 'full' })
	}
}

export async function buildTypeDefs() {
	const paths = Object.entries(params.options)
		.filter(([k, v]) => k.endsWith('Out'))
		.map(([k, v]) => v)
	// flush old files
	await Promise.all(paths.map(fs.emptyDir))
	shellify(params)
}
