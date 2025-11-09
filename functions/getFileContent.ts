import path from 'path'
import { readFileSync, statSync } from 'fs'
import { handleError, validatePathInWorkingDirectory } from './utils'

export default function getFileContent(
	workingDirectory: string,
	filePath: string
) {
	try {
		const absoluteFilePath = validatePathInWorkingDirectory(
			workingDirectory,
			filePath
		)

		const stats = statSync(absoluteFilePath)

		if (!stats.isFile()) {
			throw Error(
				`File not found or is not a regular file: "${absoluteFilePath}"`
			)
		}

		const file = readFileSync(absoluteFilePath)
		let content = file.toString()

		if (content.length > 10000) {
			content = content.slice(0, 10000)
			content += `[...File "${filePath}" truncated at 10000 characters]`
		}

		return content
	} catch (error) {
		return handleError(error)
	}
}
