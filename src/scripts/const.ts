import path from 'path'

export const VERSION = '2.0.0-dev'

export const PKG_NAMESPACE = '@datasworn'

export const CORE_PKG_ID = `${PKG_NAMESPACE}/core`

export const LEGACY_ID_PATH = path.join(process.cwd(), 'src/legacy_id_map.json')

export const ROOT_DATA_IN = path.join(process.cwd(), 'src/data-in')
export const ROOT_DATA_OUT = path.join(process.cwd(), 'src/data-out')
const ROOT_TYPES_OUT = path.join(process.cwd(), 'src/types/io')

export const ROOT_PACKAGES = path.join(process.cwd(), PKG_NAMESPACE)
export const CORE_PKG_DIR = path.join(ROOT_PACKAGES, 'core')

export const TYPES_OUT = path.join(ROOT_TYPES_OUT, 'datasworn.d.ts')

export const SCHEMA_OUT = path.join(ROOT_DATA_OUT, 'datasworn.schema.json')
export const SCHEMA_IN = path.join(ROOT_DATA_IN, 'datasworn-input.schema.json')

export const SCHEMA_DELVE_OUT = path.join(
	ROOT_DATA_OUT,
	'datasworn-delve.schema.json'
)

export const SCHEMA_DELVE_IN = path.join(
	ROOT_DATA_OUT,
	'datasworn-delve-input.schema.json'
)

export const SCHEMA_ID = 'https://ironswornrpg.com/datasworn.schema.json'

export const INPUT_SCHEMA_ID =
	'https://ironswornrpg.com/datasworn-input.schema.json'

export const DELVE_SCHEMA_ID =
	'https://ironswornrpg.com/datasworn-delve.schema.json'

export const DELVE_INPUT_ID =
	'https://ironswornrpg.com/datasworn-delve-input.schema.json'
