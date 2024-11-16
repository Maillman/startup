require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = 
    `
    Generate a quote from a random movie / tv show in pop fiction. The title should be included.
    Also include any related keywords associated with the quote (such as who said it). Finally, give a brief one-sentence context behind the quote.
    It should be formatted as such in JSON:
    {
        "Title": "TITLEHERE",
        "Keywords": ["WORD1","WORD2",...]",
        "Quote": "QUOTEHERE",
        "Context": "CONTEXTHERE"
    }
    `;

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
}