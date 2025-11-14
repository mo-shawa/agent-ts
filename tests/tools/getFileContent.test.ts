import { expect, test } from 'bun:test'
import path from 'node:path'
import getFileContent from '../../src/tools/filesystem/getFileContent'

const WORKING_DIR = path.resolve(import.meta.dir, '../../src/examples')

test('main.ts file', async () => {
	const res = await getFileContent(WORKING_DIR, 'calculator/main.ts')
	console.log(`Result for main.ts:\n${res}`)
	expect(res).toBeDefined()
})

test('pkg/calculator.ts file', async () => {
	const res = await getFileContent(WORKING_DIR, 'calculator/pkg/calculator.ts')
	console.log(`Result for pkg/calculator.ts:\n${res}`)
	expect(res).toBeDefined()
})

test('/bin/cat file', async () => {
	const res = await getFileContent(WORKING_DIR, '/bin/cat')
	console.log(`Result for /bin/cat:\n${res}`)
	expect(res).toBeDefined()
})

test('missing file', async () => {
	const res = await getFileContent(
		WORKING_DIR,
		'calculator/pkg/does_not_exist.ts'
	)
	console.log(`Result for missing file:\n${res}`)
	expect(res).toBeDefined()
})
