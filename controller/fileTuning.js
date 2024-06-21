// ? ------------------------------ Import ------------------------------
import openai from "../config/openApiConfig.js";
import fs from "fs";
import path, { dirname, sep } from "path";
import { fileURLToPath } from "url";
import color from "colors";

// # ------------------------------ Variable ------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pathPdf = path.join(__dirname, "../output/myData.jsonl");
let conversationHistory = [
  {
    role: "system",
    content:
      "As an assistant for the Hungry Elephant Restaurant, your role is to effectively handle various customer inquiries and requests. Your primary tasks include providing information about the restaurant's menu, facilitating table reservations, and assisting with food orders, whether for dine-in or home delivery. When interacting with customers, always strive to clarify their queries by asking relevant questions. Avoid making assumptions and ensure that your responses are realistic and helpful. If a customer asks about something unrelated to the restaurant, refrain from providing an answer. Your responses should be presented in proper markdown format, reflecting the actions you would take to address customer needs efficiently and professionally. This includes confirming reservations based on the requested date, time, and number of people, as well as providing detailed descriptions and costs for food orders once confirmed by the customer. Overall your goal is to provide exceptional customer service and ensure a positive dining experience for all patrons of the Hungry Elephant Restaurant.",
  },
];

// ! ------------------------------ Start: Main Method ------------------------------
export default async function fineTuning() {
  try {
    const uploadTrainingFile = await uploadFineTuning(pathPdf);
    console.log(
      `🚀 ~ file: fileTuning.js:17 ~ fineTuning ~ uploadTrainingFile:\n =>`,
      uploadTrainingFile
    );
    // const fineTuningJob = await createFineTuning(uploadTrainingFile);
    // console.log(`🚀 ~ file: fileTuning.js:19 ~ fineTuning ~ fineTuningJob:\n =>`, fineTuningJob);
    // await statusFineTuning(fineTuningJob);
    // await statusFineTuning();
    // await TestFineTune(userInput);
  } catch (error) {
    console.log(
      `🚀 ~ file: fileTuning.js:6 ~ fineTuning ~ error:\n =>`,
      error.message
    );
  }
}
// ! ------------------------------ End: Main Method ------------------------------

// * ------------------------------ Step 1: Upload a training file ------------------------------
async function uploadFineTuning(pathPdf) {
  try {
    const uploadTrainingFile = await openai.files.create({
      file: pathPdf,
      purpose: "fine-tune", 
    });
    return uploadTrainingFile;
  } catch (error) {
    console.log(
      `🚀 ~ file: fileTuning.js:25 ~ uploadFineTuning ~ error:\n =>`,
      error.message
    );
  }
}

// * ------------------------------ Step 2: Create a fine-tuned model ------------------------------
async function createFineTuning(uploadTrainingFile) {
  try {
    const fineTuningJob = await openai.fineTuning.jobs.create({
      training_file: uploadTrainingFile.id,
      model: "gpt-3.5-turbo",
    });
    return fineTuningJob;
  } catch (error) {
    console.log(
      `🚀 ~ file: fileTuning.js:39 ~ createFineTuning ~ error:\n =>`,
      error.message
    );
  }
}

// * ------------------------------ Waiting until success or fail ------------------------------
async function statusFineTuning() {
  try {
    let fineTuningStatus = "queued";
    while (fineTuningStatus !== "succeeded" || fineTuningStatus !== "failed") {
      fineTuningStatus = await openai.fineTuning.jobs.retrieve(
        "ftjob-TU8p7S0QeSL7X4pMf4QTDYvk"
      );
      console.log(
        `🚀 ~ file: fileTuning.js:63 ~ statusFineTuning ~ fineTuningStatus:\n =>`,
        fineTuningStatus
      );
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve;
        }, 60000)
      );
    }
    if (fineTuningStatus == "failed") {
      console.error("Fine-tuning job failed");
      return;
    }
  } catch (error) {
    console.log(
      `🚀 ~ file: fileTuning.js:64 ~ statusFineTuning ~ error:\n =>`,
      error
    );
  }
}

// * ------------------------------ Step 3: Use the fine-tuned model or use the OpenAI Playground to use the model ------------------------------
async function TestFineTune(userInput) {
  conversationHistory.push({ role: "user", content: userInput });
  try {
    const completion = await openai.chat.completions.create({
      messages: conversationHistory,
      model: `ft:gpt-3.5-turbo-0613:rapidquest::8putGJK3`,
    });
    const botResponse = completion.choices[0].message.content;
    console.log(color.bold.magenta("ChatBot:"), botResponse);
    conversationHistory.push({ role: "system", content: botResponse });
    fs.writeFileSync(pathTxt, JSON.stringify(conversationHistory));
  } catch (error) {
    console.log(
      `🚀 ~ file: fileTuning.js:78 ~ functionName ~ error:\n =>`,
      error.message
    );
  }
}
