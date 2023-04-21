import fs from 'fs'

/**
 * It returns an array of all the yaml filepaths in the directory.
 * @returns An array of file paths.
 */
export function getYamlFiles (dir: string): string[] {
  return fs
    .readdirSync(dir)
    .filter(file => !file.startsWith('_') && !file.startsWith('.') && file.match(/.*\.yaml/))
    .map(str => (`${dir.toString()}/${str}`))
}
