import OpenAI from "openai";
import { API_KEY } from "../constant.js";
const openai = new OpenAI({
  apiKey: API_KEY,
});

export default openai;
