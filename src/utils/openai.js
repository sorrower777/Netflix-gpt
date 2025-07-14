import OpenAI from "openai";
import { OPENAI_KEY } from "./constants";

// Only create OpenAI instance if API key is available
let openai = null;

if (OPENAI_KEY && OPENAI_KEY !== 'your_openai_api_key_here') {
  openai = new OpenAI({
    apiKey: OPENAI_KEY,
    dangerouslyAllowBrowser: true,
  });
}

export default openai;
