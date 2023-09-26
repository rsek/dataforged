// Rebuilds the `dist` folder with the contents of the distributable package

import fs from 'fs-extra'

fs.emptyDirSync('dist')

// copy json data
fs.copySync('src/data-out/starforged', 'dist')

// copy schema
fs.copySync(
	'src/data-out/starforged.schema.json',
	'dist/starforged.schema.json'
)

// copy TS types to types dir
fs.copySync('src/types/output/starforged.d.ts', 'dist/types.d.ts')

// copy images
fs.copySync(
	'src/data-in/starforged/starforged/images',
	'dist/starforged/images'
)
fs.copySync('src/data-in/starforged/starforged/icons', 'dist/starforged/icons')

// copy map of legacy IDs
fs.copySync('src/legacy_id_map.json', 'dist/legacy_id_map.json')
