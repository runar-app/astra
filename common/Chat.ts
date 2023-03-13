export interface Message {
  content: string;
  role: "assistant" | "user";
}

export interface ChatRequest {
  history: Message[];
  userMessage: string;
  language: string;
}

export interface ChatResponse {
  text: string;
}
