import { readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { type FunctionDeclaration, Type } from '@google/genai'
import { handleError, validatePathInWorkingDirectory } from '../utils'

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
				isDir: stats.isDirectory()
			}

			outputString += `- ${data.name}: file_size=${data.size} bytes, is_dir=${data.isDir}\n`
		})

		return outputString
	} catch (error) {
		return handleError(error)
	}
}

export const SchemaGetFileInfo: FunctionDeclaration = {
	name: 'getFileInfo',

	description:
		'Lists files in the specified directory along with their sizes, constrained to the working directory.',

	parameters: {
		type: Type.OBJECT,

		properties: {
			directory: {
				type: Type.STRING,
				description:
					'The directory to list files from, relative to the working directory. If not provided, lists files in the working directory itself.'
			}
		}
	}
}
