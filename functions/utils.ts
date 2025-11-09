import path from 'path'

export function validatePathInWorkingDirectory(
	workingDirectory: string,
	childPath: string
) {
	const absoluteWorkingDirectoryPath = path.resolve(workingDirectory)
	const relativeFullPath = path.join(absoluteWorkingDirectoryPath, childPath)

	const absoluteFullPath = path.resolve(relativeFullPath)

	if (!absoluteFullPath.startsWith(absoluteWorkingDirectoryPath)) {
		throw Error(
			`Cannot access "${absoluteFullPath}" as it is outside the permitted working directory`
		)
	}

	return absoluteFullPath
}

export function handleError(error: unknown) {
	if (error instanceof Error) {
		return `Error: ${error.message}`
	}
	return `An unknown error occurred: ${typeof error} | ${String(error)}`
}
