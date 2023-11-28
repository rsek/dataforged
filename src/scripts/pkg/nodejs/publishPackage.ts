import path from 'path'
import { shellify } from '../../../shellify.js'
import { PKG_DIR_NODE } from '../../const.js'
import { config as pkg } from './buildCorePackage.js'

function publishCorePackage() {
	shellify({
		command: 'npm publish',
		args: [pkg.rootDir],
		options: {
			tag: 'next',
			access: 'public'
		}
	})
}

publishCorePackage()
