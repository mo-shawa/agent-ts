import path from 'path'
import { readdirSync, statSync } from 'fs'
import { handleError, validatePathInWorkingDirectory } from './utils'

export default function getFileInfo(workingDirectory: string, directory = '.') {
	try {
		const absoluteFullPath = validatePathInWorkingDirectory(
			workingDirectory,
			directory
		)
		// check if path is dir
		const stats = statSync(absoluteFullPath)

		if (!stats.isDirectory()) {
			throw Error(`${absoluteFullPath} is not a directory`)
		}

		const children = readdirSync(absoluteFullPath)

		let outputString = ''

		children.forEach((child) => {
			const absolutePath = path.join(absoluteFullPath, child)
			const stats = statSync(absolutePath)

			const data = {
				name: child,
				size: stats.size,
				isDir: stats.isDirectory(),
			}

			outputString += `- ${data.name}: file_size=${data.size} bytes, is_dir=${data.isDir}\n`
		})

		return outputString
	} catch (error) {
		return handleError(error)
	}
}
