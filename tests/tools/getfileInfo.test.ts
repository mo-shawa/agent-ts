import { expect, test } from 'bun:test'
import path from 'node:path'
import getFilesInfo from '../../src/tools/filesystem/getFileInfo'

const WORKING_DIR = path.resolve(import.meta.dir, '../../src/examples')

test('current directory', async () => {
	const res = await getFilesInfo(WORKING_DIR, 'calculator')
	console.log(`Result for current directory:\n${res}`)
	expect(res).toBeDefined()
})

test("'pkg' directory", async () => {
	const res = await getFilesInfo(WORKING_DIR, 'calculator/pkg')
	console.log(`Result for 'pkg' directory:\n${res}`)
	expect(res).toBeDefined()
})

test("'/bin' directory", async () => {
	const res = await getFilesInfo(WORKING_DIR, '/bin')
	console.log(`Result for '/bin' directory:\n${res}`)
	expect(res).toBeDefined()
})

test("'../' directory", async () => {
	const res = await getFilesInfo(WORKING_DIR, '../')
	console.log(`Result for '../' directory:\n${res}`)
	expect(res).toBeDefined()
})
