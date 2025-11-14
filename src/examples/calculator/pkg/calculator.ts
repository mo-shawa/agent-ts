// calculator.ts

export class Calculator {
	private operators: Record<string, (a: number, b: number) => number>
	private precedence: Record<string, number>

	constructor() {
		this.operators = {
			'+': (a, b) => a + b,
			'-': (a, b) => a - b,
			'*': (a, b) => a * b,
			'/': (a, b) => a / b
		}
		this.precedence = {
			'+': 1,
			'-': 1,
			'*': 2,
			'/': 2
		}
	}

	evaluate(expression: string): number | null {
		if (!expression || !expression.trim()) {
			return null
		}
		const tokens = expression.trim().split(' ')
		return this._evaluate_infix(tokens)
	}

	private _evaluate_infix(tokens: string[]): number {
		const values: number[] = []
		const operators: string[] = []

		for (const token of tokens) {
			if (token in this.operators) {
				while (
					operators.length > 0 &&
					operators[operators.length - 1] in this.operators &&
					this.precedence[operators[operators.length - 1]] >=
						this.precedence[token]
				) {
					this._apply_operator(operators, values)
				}
				operators.push(token)
			} else {
				const num = Number.parseFloat(token)
				if (Number.isNaN(num)) {
					throw new Error(`invalid token: ${token}`)
				}
				values.push(num)
			}
		}

		while (operators.length > 0) {
			this._apply_operator(operators, values)
		}

		if (values.length !== 1) {
			throw new Error('invalid expression')
		}

		return values[0]
	}

	private _apply_operator(operators: string[], values: number[]): void {
		if (operators.length === 0) {
			return
		}

		const operator = operators.pop() as string
		if (values.length < 2) {
			throw new Error(`not enough operands for operator ${operator}`)
		}

		const b = values.pop() as number
		const a = values.pop() as number
		values.push(this.operators[operator](a, b))
	}
}
