import { handleError, validatePathInWorkingDirectory } from './utils'
import { writeFileSync } from 'fs'

export default function writeFile(
	workingDirectory: string,
	filePath: string,
	content: string
) {
	try {
		const absoluteFullPath = validatePathInWorkingDirectory(
			workingDirectory,
			filePath
		)

		writeFileSync(absoluteFullPath, content)

		return `Successfully wrote to "${filePath}" (${content.length} characters written)`
	} catch (error) {
		return handleError(error)
	}
}
