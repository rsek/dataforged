import { JSONSchema7 } from 'json-schema'
import { ROOT_OUTPUT, SCHEMA_OUT } from '../const.js'
import * as pkgs from '../pkg/pkgConfig.js'
import fs from 'fs-extra'
import JsonSchema from 'json-schema-library'
import { loadDataswornNamespace } from '../datasworn/loadDatasworn.js'
import { extractLocaleStrings } from './extractLocaleStrings.js'
import path from 'path'
import { Datasworn } from '../../types/Datasworn.js'

const DEFAULT_LOCALE = 'en'

const schema = (await fs.readJSON(SCHEMA_OUT)) as JSONSchema7
const validator = new JsonSchema.Draft07(schema as any)

for (const pkg of Object.values(pkgs)) {
	const collections = await loadDataswornNamespace(pkg.id)

	const localeDir = path.join(ROOT_OUTPUT, pkg.id, 'i18n', DEFAULT_LOCALE)

	await fs.emptyDir(localeDir)

	for (const collection of collections) {
		const omitKeys: (keyof Datasworn)[] = ['source', 'id']
		const [type] = Object.keys(collection).filter(
			(k) => !omitKeys.includes(k as any)
		)
		if (type == null) continue

		const result = extractLocaleStrings(collection, validator)

		// console.log(result)

		const data = []

		for (const [text, sources] of result) data.push({ text, sources })

		const dest = path.join(localeDir, `${type}.json`)

		void fs.writeJSON(dest, data, { encoding: 'utf-8', spaces: '\t' })
	}
}
