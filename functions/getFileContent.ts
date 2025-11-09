import path from 'path'
import { readFileSync, statSync } from 'fs'

export default function getFileContent(
	workingDirectory: string,
	filePath: string
) {
	try {
		const absoluteWorkingDirectoryPath = path.resolve(workingDirectory)
		const relativeFilePath = path.join(workingDirectory, filePath)

		const absoluteFilePath = path.resolve(relativeFilePath)

		if (!absoluteFilePath.startsWith(absoluteWorkingDirectoryPath)) {
			throw Error(
				`Cannot list "${absoluteFilePath}" as it is outside the permitted working directory`
			)
		}

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
		if (error instanceof Error) return `Error: ${error.message}`
	}
}
