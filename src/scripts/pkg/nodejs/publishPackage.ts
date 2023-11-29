import { shellify } from '../../../shellify.js'
import { config as pkg } from './buildCorePackage.js'
import { setPackageVersions } from './setPackageVersions.js'

await setPackageVersions()

function publishCorePackage() {
	shellify({
		command: 'npm publish --otp $OTP',
		args: [pkg.rootDir],
		options: {
			tag: 'next',
			access: 'public'
		}
	})
}

// publishCorePackage()
