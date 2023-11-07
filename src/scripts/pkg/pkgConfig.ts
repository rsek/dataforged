import path from 'path'
import { type DataPackageConfig } from '../../schema/tools/build/index.js'
import {
	PKG_SCOPE_OFFICIAL,
	PKG_SCOPE_COMMUNITY,
	ROOT_SOURCE_DATA
} from '../const.js'

export const IronswornClassic: DataPackageConfig = {
	type: 'standalone',
	paths: {
		source: path.join(ROOT_SOURCE_DATA, 'classic')
	},
	id: 'classic',
	pkg: { name: 'ironsworn-classic', scope: PKG_SCOPE_OFFICIAL }
}

export const IronswornClassicDelve: DataPackageConfig = {
	type: 'expansion',
	paths: {
		source: path.join(ROOT_SOURCE_DATA, 'delve')
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
		source: path.join(ROOT_SOURCE_DATA, 'starforged'),
		assets: [
			path.join(ROOT_SOURCE_DATA, 'images'),
			path.join(ROOT_SOURCE_DATA, 'icons')
		]
	},
	pkg: { name: 'starforged', scope: PKG_SCOPE_OFFICIAL }
}

export const SunderedIsles: DataPackageConfig = {
	/** The *book* isn't standalone, but all the assets, moves, etc effectively are. */
	type: 'standalone',
	paths: {
		source: path.join(ROOT_SOURCE_DATA, 'sundered_isles')
	},
	id: 'sundered_isles',

	pkg: { name: 'sundered-isles', scope: PKG_SCOPE_OFFICIAL }
}

// currently these just exist for testing purposes

export const Rsek: DataPackageConfig = {
	type: 'expansion',
	paths: {
		source: path.join(ROOT_SOURCE_DATA, 'rsek')
	},
	id: 'rsek',
	pkg: { name: 'rsek', scope: PKG_SCOPE_COMMUNITY }
}

export const Starsmith: DataPackageConfig = {
	type: 'expansion',
	paths: {
		source: path.join(ROOT_SOURCE_DATA, 'starsmith')
	},
	id: 'starsmith',
	pkg: { name: 'starsmith', scope: PKG_SCOPE_COMMUNITY }
}
