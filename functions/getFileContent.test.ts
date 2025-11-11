import { expect, test } from 'bun:test'
import getFileContent from './getFileContent'

test('main.ts file', async () => {
	const res = await getFileContent('calculator', 'main.ts')
	console.log(`Result for main.ts:\n${res}`)
	expect(res).toBeDefined()
})

test('pkg/calculator.ts file', async () => {
	const res = await getFileContent('calculator', 'pkg/calculator.ts')
	console.log(`Result for pkg/calculator.ts:\n${res}`)
	expect(res).toBeDefined()
})

test('/bin/cat file', async () => {
	const res = await getFileContent('calculator', '/bin/cat')
	console.log(`Result for /bin/cat:\n${res}`)
	expect(res).toBeDefined()
})

test('missing file', async () => {
	const res = await getFileContent('calculator', 'pkg/does_not_exist.ts')
	console.log(`Result for missing file:\n${res}`)
	expect(res).toBeDefined()
})
