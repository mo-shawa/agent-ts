import writeFile from './writeFile'
import { expect, test } from 'bun:test'

test('write to lorem.txt', () => {
	const res = writeFile(
		'calculator',
		'lorem.txt',
		"wait, this isn't lorem ipsum"
	)
	console.log(`Result for lorem.txt:\n${res}`)
	expect(res).toBeDefined()
	expect(res).toContain('Successfully wrote')
})

test('write to pkg/morelorem.txt', () => {
	const res = writeFile(
		'calculator',
		'pkg/morelorem.txt',
		'lorem ipsum dolor sit amet'
	)
	console.log(`Result for pkg/morelorem.txt:\n${res}`)
	expect(res).toBeDefined()
	expect(res).toContain('Successfully wrote')
})

test('write to /tmp/temp.txt (should not be allowed)', () => {
	const res = writeFile(
		'calculator',
		'/tmp/temp.txt',
		'this should not be allowed'
	)
	console.log(`Result for /tmp/temp.txt:\n${res}`)
	expect(res).toBeDefined()
	expect(res).toContain('Error')
})
