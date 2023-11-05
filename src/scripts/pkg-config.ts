export interface DataPackageOptions {
	type: 'standalone' | 'expansion'
	/** YAML data dir, relative to `src/data-in` and `src/data-out` */
	dataDir: string
	/** package output dir, relative to `@datasworn` */
	packageOut: string
	noBuild?: boolean
}

export const IronswornClassic: DataPackageOptions = {
	type: 'standalone',
	dataDir: 'classic',
	packageOut: 'ironsworn-classic'
}

export const IronswornClassicDelve: DataPackageOptions = {
	type: 'expansion',
	dataDir: 'delve',
	packageOut: 'ironsworn-classic-delve'
}

export const Starforged: DataPackageOptions = {
	type: 'standalone',
	dataDir: 'starforged',
	packageOut: 'starforged'
}

export const SunderedIsles: DataPackageOptions = {
	/** The *book* isn't standalone, but all the assets, moves, etc effectively are. */
	type: 'standalone',
	dataDir: 'sundered-isles',
	packageOut: 'sundered-isles',
	noBuild: true
}
