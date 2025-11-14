import { expect, test } from 'bun:test'
import path from 'node:path'
import writeFile from '../../src/tools/filesystem/writeFile'

const WORKING_DIR = path.resolve(import.meta.dir, '../../src/examples')

test('write to lorem.txt', () => {
	const res = writeFile(
		WORKING_DIR,
		'calculator/lorem.txt',
		"wait, this isn't lorem ipsum"
	)
	console.log(`Result for lorem.txt:\n${res}`)
	expect(res).toBeDefined()
	expect(res).toContain('Successfully wrote')
})

test('write to pkg/morelorem.txt', () => {
	const res = writeFile(
		WORKING_DIR,
		'calculator/pkg/morelorem.txt',
		'lorem ipsum dolor sit amet'
	)
	console.log(`Result for pkg/morelorem.txt:\n${res}`)
	expect(res).toBeDefined()
	expect(res).toContain('Successfully wrote')
})

test('write to /tmp/temp.txt (should not be allowed)', () => {
	const res = writeFile(
		WORKING_DIR,
		'/tmp/temp.txt',
		'this should not be allowed'
	)
	console.log(`Result for /tmp/temp.txt:\n${res}`)
	expect(res).toBeDefined()
	expect(res).toContain('Error')
})
