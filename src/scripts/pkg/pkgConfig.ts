import path from 'path'
import { type DataPackageConfig } from '../../schema/tools/build/index.js'
import {
	PKG_SCOPE_OFFICIAL,
	PKG_SCOPE_COMMUNITY,
	ROOT_DATA_IN
} from '../const.js'

export const IronswornClassic: DataPackageConfig = {
	type: 'standalone',
	paths: {
		source: path.join(ROOT_DATA_IN, 'classic')
	},
	id: 'classic',
	pkg: { name: 'ironsworn-classic', scope: PKG_SCOPE_OFFICIAL }
}

export const IronswornClassicDelve: DataPackageConfig = {
	type: 'expansion',
	paths: {
		source: path.join(ROOT_DATA_IN, 'delve')
	},
	id: 'delve',
	pkg: {
		name: 'ironsworn-classic-delve',
		scope: PKG_SCOPE_OFFICIAL
	}
}

export const Starforged: DataPackageConfig = {
	id: 'starforged',
	type: 'standalone',
	paths: {
		source: path.join(ROOT_DATA_IN, 'starforged'),
		assets: [
			path.join(ROOT_DATA_IN, 'images'),
			path.join(ROOT_DATA_IN, 'icons')
		]
	},
	pkg: { name: 'starforged', scope: PKG_SCOPE_OFFICIAL }
}

export const SunderedIsles: DataPackageConfig = {
	/** The *book* isn't standalone, but all the assets, moves, etc effectively are. */
	type: 'standalone',
	paths: {
		source: path.join(ROOT_DATA_IN, 'sundered_isles')
	},
	id: 'sundered_isles',

	pkg: { name: 'sundered-isles', scope: PKG_SCOPE_OFFICIAL }
}

// currently these just exist for testing purposes

export const Rsek: DataPackageConfig = {
	type: 'expansion',
	paths: {
		source: path.join(ROOT_DATA_IN, 'rsek')
	},
	id: 'rsek',
	pkg: { name: 'rsek', scope: PKG_SCOPE_COMMUNITY }
}

export const Starsmith: DataPackageConfig = {
	type: 'expansion',
	paths: {
		source: path.join(ROOT_DATA_IN, 'starsmith')
	},
	id: 'starsmith',
	pkg: { name: 'starsmith', scope: PKG_SCOPE_COMMUNITY }
}
