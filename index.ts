import { GoogleGenAI } from '@google/genai'

const apiKey = process.env.GEMINI_API_KEY

/**
 * Bun.argv[0] is the path to the Bun executable
 * Bun.argv[1] is the path to this script
 * Bun.argv[2] onwards are CLI arguments
 */
const prompt = Bun.argv[2]

const client = new GoogleGenAI({ apiKey })

const response = await client.models.generateContent({
	contents: prompt,
	model: 'gemini-2.0-flash-001',
})

console.log(response.text)

console.table({
	'Prompt tokens': response.usageMetadata?.promptTokenCount,
	'Response tokens': response.usageMetadata?.candidatesTokenCount,
})
