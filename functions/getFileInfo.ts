import path from 'path'
import { readdirSync, statSync } from 'fs'

export default function getFileInfo(workingDirectory: string, directory = '.') {
	try {
		const absoluteWorkingDirectoryPath = path.resolve(workingDirectory)
		const relativeFullPath = path.join(workingDirectory, directory)

		const absoluteFullPath = path.resolve(relativeFullPath)

		if (!absoluteFullPath.startsWith(absoluteWorkingDirectoryPath)) {
			throw Error(
				`Cannot list "${absoluteFullPath}" as it is outside the permitted working directory`
			)
		}

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
		if (error instanceof Error) return `Error: ${error.message}`
	}
}

const res = getFileInfo('/home/moshawa/code/learn/agent-ts/')
console.log(res)
