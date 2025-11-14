import { handleError, validatePathInWorkingDirectory } from '../utils'

export default async function runTsFile(
	workingDirectory: string,
	filePath: string,
	args: string[] = []
) {
	try {
		const absoluteFilePath = validatePathInWorkingDirectory(
			workingDirectory,
			filePath
		)

		const file = Bun.file(absoluteFilePath)

		const fileExists = await file.exists()

		if (!fileExists) {
			throw Error(`file "${filePath}" not found.`)
		}

		if (!file.name?.endsWith('.ts')) {
			throw Error(`"${filePath}" is not a TypeScript file.`)
		}

		const process = Bun.spawn({
			cmd: ['bun', absoluteFilePath, ...args],
			stdout: 'pipe',
			stderr: 'pipe',
			timeout: 30000 // 30 seconds in ms
		})

		await process.exited

		const stdout = await process.stdout.text()
		const stderr = await process.stderr.text()

		if (process.exitCode !== 0) {
			throw Error(
				`Process exited with code ${process.exitCode}\nStderr: ${stderr}`
			)
		}

		return `\nSTDOUT:\n${stdout}\nSTDERR:\n${stderr}`
	} catch (error) {
		return handleError(error)
	}
}
