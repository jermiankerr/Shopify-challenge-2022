import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-curie-001", {
    prompt: generatePrompt(req.body.chat),
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(chat) {
  const AiResponse =
  chat[0].toUpperCase() + chat.slice(1).toLowerCase();
  return `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.

  Human: Hello, who are you?
  AI: I am an AI created by OpenAI. How can I help you today?
  AI:${AiResponse}
  Human:`;

}

