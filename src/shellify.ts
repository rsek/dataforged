import { exec } from 'child_process'
import { kebabCase } from 'lodash-es'
import { type CamelCase } from 'type-fest'
import { log } from './scripts/utils/logger.js'

export function shellify<T extends ShellCommandParams>({
	command,
	args = [],
	options = {}
}: T) {
	const substrings: string[] = [command, ...args.map((arg) => `"${arg}"`)]

	for (const [k, v] of Object.entries(options)) {
		substrings.push(`--${kebabCase(k)} "${v.toString()}"`)
	}

	const cmdString = substrings.join(' ')

	// console.log(cmdString)

	exec(cmdString, (error, stdout, stderr) => {
		if (error) {
			log.error(`error: ${error.message}`)
			return
		}
		if (stderr) {
			log.error(`stderr: ${stderr}`)
			return
		}
		log.info(`stdout: ${stdout}`)
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
	args: Arguments
	options: Options
}
