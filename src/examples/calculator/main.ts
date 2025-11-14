// main.ts

import { Calculator } from './pkg/calculator'
import { formatJsonOutput } from './pkg/render'

function main() {
	const calculator = new Calculator()
	if (process.argv.length <= 2) {
		console.log('Calculator App')
		console.log('Usage: python main.py "<expression>"')
		console.log('Example: python main.py "3 + 5"')
		return
	}

	const expression = process.argv.slice(2).join(' ')
	try {
		const result = calculator.evaluate(expression)
		if (result !== null) {
			const to_print = formatJsonOutput(expression, result)
			console.log(to_print)
		} else {
			console.log('Error: Expression is empty or contains only whitespace.')
		}
	} catch (e) {
		if (e instanceof Error) {
			console.log(`Error: ${e.message}`)
		} else {
			console.log(`Error: ${e}`)
		}
	}
}

if (import.meta.main) {
	main()
}
