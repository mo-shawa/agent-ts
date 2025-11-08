import getFilesInfo from './getFileInfo'
import { expect, test } from 'bun:test'

test('current directory', async () => {
	const res = await getFilesInfo('calculator', '.')
	console.log(`Result for current directory:\n${res}`)
	expect(res).toBeDefined()
})

test("'pkg' directory", async () => {
	const res = await getFilesInfo('calculator', 'pkg')
	console.log(`Result for 'pkg' directory:\n${res}`)
	expect(res).toBeDefined()
})

test("'/bin' directory", async () => {
	const res = await getFilesInfo('calculator', '/bin')
	console.log(`Result for '/bin' directory:\n${res}`)
	expect(res).toBeDefined()
})

test("'../' directory", async () => {
	const res = await getFilesInfo('calculator', '../')
	console.log(`Result for '../' directory:\n${res}`)
	expect(res).toBeDefined()
})
