import * as pkgConfig from '../pkgConfig.js'
import path from 'path'
import { PKG_DIR_NODE } from '../../const.js'
import { exec } from 'child_process'
import Log from '../../utils/Log.js'
import { updatePackageVersions } from './updatePackageVersions.js'

function publishCommand(dir: string, tag: string = 'latest', dryRun = false) {
	let cmd = `npm publish "${dir}" --tag ${tag} --otp $OTP`
	if (dryRun) cmd += ' --dry-run'
	// console.log(cmd)
	return cmd
}

await updatePackageVersions()

const corePkgId = '@datasworn/core'
const corePkgPath = path.join(PKG_DIR_NODE, corePkgId)

const commands: string[] = []

commands.push(publishCommand(corePkgPath))

for (const { pkg } of Object.values(pkgConfig)) {
	const id = `${pkg.scope}/${pkg.name}`

	const dir = path.join(PKG_DIR_NODE, id)
	commands.push(publishCommand(dir))
}

for (const command of commands) {
	exec(command, (error, stdout, stderr) => {
		if (error) return Log.error(`error: ${error.message}`)

		if (stderr) return Log.error(`stderr: ${stderr}`)

		return Log.info(`stdout: ${stdout}`)
	})
}
