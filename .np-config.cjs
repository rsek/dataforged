/**
 * @typedef {object} NpConfig
 * @property {boolean} [anyBranch=false] - Allow publishing from any branch (false by default).
 * @property {string} [branch="master"] - Name of the release branch (master by default).
 * @property {boolean} [cleanup=true] - Cleanup node_modules (true by default).
 * @property {boolean} [tests=true] - Run npm test (true by default).
 * @property {boolean} [yolo] - Skip cleanup and testing (false by default).
 * @property {boolean} [publish=true] - Publish (true by default).
 * @property {boolean} [preview=false] - Show tasks without actually executing them (false by default).
 * @property {string} [tag="latest"] - Publish under a given dist-tag (latest by default).
 * @property {boolean} [yarn=true] - Use yarn if possible (true by default).
 * @property {string} [contents="."] - Subdirectory to publish (. by default).
 * @property {boolean} [releaseDraft=true] - Open a GitHub release draft after releasing (true by default).
 * @property {string} [testScript="test"] - Name of npm run script to run tests before publishing (test by default).
 * @property {boolean} [2fa=true] - Enable 2FA on new packages (true by default) (setting this to false is not recommended).
 * @property {string} [message] - The commit message used for the version bump. Any %s in the string will be replaced with the new version. By default, npm uses %s and Yarn uses v%s.

 */

/**
 * @type {NpConfig}
 * Configuration for Dataforged\@next
 */
module.exports = {
	branch: 'v2',
	contents: './pkg/nodejs/dataforged_legacy',
	preview: true
}
