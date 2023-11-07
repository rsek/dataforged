import Winston from 'winston'
import { type TransformableInfo } from 'logform'

const { combine, timestamp, label, printf, colorize } = Winston.format

const logFormat = printf(
	({ level, message, label, timestamp }: TransformableInfo) =>
		`${timestamp as string} [${label as string}] ${level}: ${message as string}`
)

const log = Winston.createLogger({
	format: combine(
		label({ label: 'Datasworn' }),
		timestamp({ format: 'hh:mm:ss.SSS' }),
		logFormat
		// colorize({
		// 	level: true,
		// 	colors: { warn: 'purple', info: 'blue', error: 'red' }
		// })
	),

	transports: [new Winston.transports.Console({})]
})

export { log }
