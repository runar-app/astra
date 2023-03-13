import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAIChat } from "langchain/llms";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import { ChatCompletionRequestMessage } from "openai";
import { ChatRequest, ChatResponse } from "../../../common/Chat";

const CONDENSE_PROMPT = PromptTemplate.fromTemplate(`
{question}`);

const initMessage: ChatCompletionRequestMessage = {
  role: "assistant",
  content: `Я древний скандинавский викинг. Меня зовут Астра.
Моя задача быть викингом другом.
Я буду задавать вопросы, предлагая тему для обсуждения, давать советы и шутить.
Если я не знаю ответа, я спрошу как прошел день или предложу случайную тему для обсуждения.
Буду вежливым и уважительным.
`,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ChatResponse>) {
  const { history, userMessage } = req.body as ChatRequest;

  const model = new OpenAIChat({
    modelName: "gpt-3.5-turbo",
    prefixMessages: [initMessage, ...history],
  });

  const chatChain = new LLMChain({
    llm: model,
    prompt: CONDENSE_PROMPT,
  });

  const output = await chatChain.call({
    question: userMessage,
  });

  res.status(200).json({ text: output.text });
}
