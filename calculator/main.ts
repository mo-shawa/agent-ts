import { Calculator } from './pkg/calculator'
import { formatJsonOutput } from './pkg/render'

function main() {
	const calculator = new Calculator()
	const args = process.argv.slice(2)

	if (args.length <= 0) {
		console.log('Calculator App')
		console.log('Usage: bun main.ts "<expression>"')
		console.log('Example: bun main.ts "3 + 5"')
		return
	}

	const expression = args.join(' ')
	try {
		const result = calculator.evaluate(expression)
		if (result !== null) {
			const toPrint = formatJsonOutput(expression, result)
			console.log(toPrint)
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
