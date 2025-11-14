import { parseArgs } from 'node:util'
import {
	type GenerateContentParameters,
	GoogleGenAI,
	type Tool
} from '@google/genai'
import { SYSTEM_PROMPT } from './config/prompts'
import { SchemaGetFileInfo } from './tools/filesystem/getFileInfo'

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

const availableFunctions: Tool = {
	functionDeclarations: [SchemaGetFileInfo]
}

const client = new GoogleGenAI({ apiKey })

const response = await client.models.generateContent({
	contents: messages,
	model: 'gemini-2.0-flash-001',
	config: { systemInstruction: SYSTEM_PROMPT, tools: [availableFunctions] }
})

if (values.verbose) {
	console.log(`\nUser prompt: ${prompt}`)
}

console.log('\n')
console.log(response.text)

if (response.functionCalls) {
	for (const call of response.functionCalls) {
		console.log(
			`\nCalling function: ${call.name}(${JSON.stringify(call.args)})`
		)
	}
}

if (values.verbose) {
	console.table({
		'Prompt tokens': response.usageMetadata?.promptTokenCount,
		'Response tokens': response.usageMetadata?.candidatesTokenCount
	})
}
