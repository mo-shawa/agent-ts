import { parseArgs } from 'node:util'
import { type GenerateContentParameters, GoogleGenAI } from '@google/genai'

const apiKey = process.env.GEMINI_API_KEY

const { values, positionals } = parseArgs({
	args: Bun.argv,
	options: {
		verbose: { type: 'boolean' }
	},
	allowPositionals: true
})

/**
 * `positionals` is somewhat analagous to `Bun.argv`
 * Bun.argv[0] is the path to the Bun executable
 * Bun.argv[1] is the path to this script
 * Bun.argv[2] onwards are CLI arguments
 */
const prompt = positionals[2]

const messages: GenerateContentParameters['contents'] = [
	{ role: 'user', parts: [{ text: prompt }] }
]

const client = new GoogleGenAI({ apiKey })

const response = await client.models.generateContent({
	contents: messages,
	model: 'gemini-2.0-flash-001'
})

if (values.verbose) {
	console.log(`\nUser prompt: ${prompt}`)
}

console.log('\n')
console.log(response.text)

if (values.verbose) {
	console.table({
		'Prompt tokens': response.usageMetadata?.promptTokenCount,
		'Response tokens': response.usageMetadata?.candidatesTokenCount
	})
}
