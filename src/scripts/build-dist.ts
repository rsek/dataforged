// Rebuilds the `dist` folder with the contents of the distributable package

// TODO: the intermediate 'data-out' step might be un

import fs from 'fs-extra'

// core package: starforged
fs.emptyDirSync('pkg/starforged/json')
fs.copySync('src/data-out/starforged/starforged', 'pkg/starforged/json')
fs.copySync(
	'src/data-out/starforged.schema.json',
	'pkg/starforged/json/schema.json',
	{
		overwrite: true
	}
)
fs.copySync('src/legacy_id_map.json', 'pkg/starforged/json/legacy_id_map.json')
fs.copySync('src/types/output/starforged.d.ts', 'pkg/starforged/index.d.ts', {
	overwrite: true
})
fs.emptyDirSync('pkg/starforged/images')
fs.copySync('src/data-in/starforged/starforged/images', 'pkg/starforged/images')
fs.emptyDirSync('pkg/starforged/icons')
fs.copySync('src/data-in/starforged/starforged/icons', 'pkg/starforged/icons')

// core package: classic
fs.emptyDirSync('pkg/ironsworn-classic/json')
fs.copySync('src/data-out/classic/classic', 'pkg/ironsworn-classic/json')
fs.copySync(
	'src/data-out/classic.schema.json',
	'pkg/ironsworn-classic/json/schema.json',
	{
		overwrite: true
	}
)
fs.copySync(
	'src/legacy_id_map.json',
	'pkg/ironsworn-classic/json/legacy_id_map.json'
)
fs.copySync(
	'src/types/output/classic.d.ts',
	'pkg/ironsworn-classic/index.d.ts',
	{
		overwrite: true
	}
)

// delve pkg: json only
fs.emptyDirSync('pkg/ironsworn-delve/json')
fs.copySync('src/data-out/classic/delve', 'pkg/ironsworn-delve/json')
