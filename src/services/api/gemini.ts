import axios from "./axios";

const generateText = async (prompt: string) => {
  return await axios.post("/gemini/generate", { prompt });
};

const getChatHistory = async () => {
  return await axios.get("/gemini/history");
};

const startNewChat = async () => {
  return await axios.get("/gemini/new-session");
};

export const geminiService = {
  generateText,
  getChatHistory,
  startNewChat,
};
