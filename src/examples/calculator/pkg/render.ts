export function formatJsonOutput(
	expression: string,
	result: number,
	indent: number = 2
): string {
	let result_to_dump: number
	if (Number.isInteger(result)) {
		result_to_dump = Math.floor(result)
	} else {
		result_to_dump = result
	}

	const output_data = {
		expression: expression,
		result: result_to_dump
	}
	return JSON.stringify(output_data, null, indent)
}
