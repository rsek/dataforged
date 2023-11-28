import { type ExecOptions, exec } from 'child_process'
import { kebabCase } from 'lodash-es'
import { type CamelCase } from 'type-fest'
import Log from './scripts/utils/Log.js'

export function shellify<T extends ShellCommandParams>({
	command,
	args = [],
	options = {},
	execOptions = {}
}: T) {
	const substrings: string[] = [command, ...args.map((arg) => `"${arg}"`)]

	for (const [k, v] of Object.entries(options)) {
		substrings.push(`--${kebabCase(k)} "${v.toString()}"`)
	}

	const cmdString = substrings.join(' ')

	// console.log(cmdString)

	exec(cmdString, execOptions, (error, stdout, stderr) => {
		if (error) {
			Log.error(`error: ${error.message}`)
			return
		}
		if (stderr) {
			Log.error(`stderr: ${stderr}`)
			return
		}
		Log.info(`stdout: ${stdout}`)
	})
}

export type ShellCommandParams<
	Command extends string = string,
	Arguments extends string[] = string[],
	Options extends Record<CamelCase<string>, any> = Record<
		CamelCase<string>,
		any
	>
> = {
	command: Command
	args?: Arguments
	options?: Options
	execOptions?: ExecOptions
}
