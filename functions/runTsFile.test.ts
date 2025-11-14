import { describe, expect, test } from 'bun:test'
import path from 'node:path'
import runTsFile from './runTsFile'

const WORKING_DIR = path.resolve(import.meta.dir, '..')

describe('runTsFile', () => {
	test('should print usage instructions when running calculator without args', async () => {
		const result = await runTsFile(WORKING_DIR, 'calculator/main.ts')

		expect(result).toContain('Calculator App')
		expect(result).toContain('Usage: bun main.ts')
		expect(result).toContain('Example: bun main.ts "3 + 5"')
	})

	test('should run calculator with args and return calculation result', async () => {
		const result = await runTsFile(WORKING_DIR, 'calculator/main.ts', ['3 + 5'])

		expect(result).toContain('STDOUT:')
		expect(result).toContain('"expression": "3 + 5"')
		expect(result).toContain('"result": 8')
	})

	test('should error when running test files directly (tests need bun test)', async () => {
		const result = await runTsFile(WORKING_DIR, 'calculator/tests.ts')

		expect(result).toContain('Error')
		expect(result).toContain('Cannot use describe outside of the test runner')
	})

	test('should error when trying to run file outside working directory', async () => {
		const result = await runTsFile(WORKING_DIR, '../main.ts')

		expect(result).toContain('Error')
		expect(result).toContain('outside the permitted working directory')
	})

	test('should error when trying to run nonexistent file', async () => {
		const result = await runTsFile(WORKING_DIR, 'calculator/nonexistent.ts')

		expect(result).toContain('Error')
		expect(result).toContain('not found')
	})

	test('should error when trying to run non-TypeScript file', async () => {
		const result = await runTsFile(WORKING_DIR, 'calculator/lorem.txt')

		expect(result).toContain('Error')
		expect(result).toContain('not a TypeScript file')
	})
})
