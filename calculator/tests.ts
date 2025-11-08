import { describe, test, expect, beforeEach } from 'bun:test'
import { Calculator } from './pkg/calculator'

describe('TestCalculator', () => {
	let calculator: Calculator

	beforeEach(() => {
		calculator = new Calculator()
	})

	test('test_addition', () => {
		const result = calculator.evaluate('3 + 5')
		expect(result).toBe(8)
	})

	test('test_subtraction', () => {
		const result = calculator.evaluate('10 - 4')
		expect(result).toBe(6)
	})

	test('test_multiplication', () => {
		const result = calculator.evaluate('3 * 4')
		expect(result).toBe(12)
	})

	test('test_division', () => {
		const result = calculator.evaluate('10 / 2')
		expect(result).toBe(5)
	})

	test('test_nested_expression', () => {
		const result = calculator.evaluate('3 * 4 + 5')
		expect(result).toBe(17)
	})

	test('test_complex_expression', () => {
		const result = calculator.evaluate('2 * 3 - 8 / 2 + 5')
		expect(result).toBe(7)
	})

	test('test_empty_expression', () => {
		const result = calculator.evaluate('')
		expect(result).toBeNull()
	})

	test('test_invalid_operator', () => {
		expect(() => {
			calculator.evaluate('$ 3 5')
		}).toThrow(Error)
	})

	test('test_not_enough_operands', () => {
		expect(() => {
			calculator.evaluate('+ 3')
		}).toThrow(Error)
	})
})
