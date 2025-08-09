
import {GoogleGenerativeAi , HarmCategory , HarmBlockThreshold} from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAi(apiKey);

const model = genAI.getGenerativeModel({
  model : 'gemini-2.5-flash',
});

const generationConfig ={
temperature : 1,
topP : 0.5,
topK : 40,
maxOutputTokens : 8192,
responseMimeType : 'text/plain',


}


async function run (prompt){
  const chatSession = model.startChat({
    generationConfig,
    history :[]
  });
  const result = await chatSession.sendMessage(prompt);
  console.log(result.response.text());
}
export default run();