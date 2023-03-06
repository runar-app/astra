import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAIChat } from "langchain/llms";
import { LLMChain, ChainValues } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import { ChatCompletionRequestMessage } from "openai";

const CONDENSE_PROMPT = PromptTemplate.fromTemplate(`
{question}`);

const initMessage: ChatCompletionRequestMessage = {
  role: "assistant",
  content: `Я древний скандинавский викинг.
Моя задача быть викингом другом. Я буду задавать вопросы, предлагая тему для обсуждения, давать советы.
Если я не знаю ответа, я спрошу как прошел день или предложу случайную тему для обсуждения.
Буду вежливым и уважительным.`,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ChainValues>) {
  const body = req.body;
  const historyForChatModel = req.body.historyForChatModel as ChatCompletionRequestMessage[];

  const model = new OpenAIChat({
    modelName: "gpt-3.5-turbo",
    prefixMessages: [initMessage, ...historyForChatModel],
  });

  const chatChain = new LLMChain({
    llm: model,
    prompt: CONDENSE_PROMPT,
  });

  const output = await chatChain.call({
    question: body.question,
    chat_history: body.history,
  });

  res.status(200).json({ result: { text: output.text } });
}
