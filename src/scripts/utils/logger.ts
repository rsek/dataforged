import Winston from 'winston'
import { type TransformableInfo } from 'logform'
import { clone, cloneDeep, merge } from 'lodash-es'
import { PKG_NAME } from '../const.js'

const { combine, timestamp, label, printf, colorize } = Winston.format

// const colors: Partial<typeof Winston.config.npm.colors> = {
// 	warn: 'purple',
// 	info: 'blue',
// 	error: 'red'
// }

const logFormat = printf(
	({ level, message, label, timestamp }: TransformableInfo) =>
		`${timestamp as string} [${label as string}] ${level}: ${message as string}`
)

const log = Winston.createLogger({
	format: combine(
		label({ label: PKG_NAME }),
		timestamp({ format: 'hh:mm:ss.SSS' }),
		logFormat
		// colorize({
		// 	level: true,
		// 	colors: { warn: 'purple', info: 'blue', error: 'red' }
		// })
	),
	// levels: merge(cloneDeep(Winston.config.npm.levels), {
	// 	colors
	// }),
	transports: [new Winston.transports.Console({})]
})

// Winston.addColors(colors as any)

export { log }
