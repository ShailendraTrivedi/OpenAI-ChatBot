import fineTuning from "./controller/fileTuning.js";

await fineTuning();

// ! ------------------------------ For Testing The Bot ------------------------------

// import readTextFile from "read-text-file";
// try {
//   var contentsPromise = readTextFile.readSync("./output/text.txt");
// } catch (error) {
//   console.log(`🚀 ~ file: index.js:50 ~ error:\n =>`, error.message);
// }

// import readline from "readline";
// import color from "colors";
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// console.log(color.green.bold(" Welcome to ChatBot ! "));

// const askForText = async () => {
//   try {
//     while (true) {
//       const userInput = await askQuestion(color.cyan("You: "));
//       if (userInput.toLowerCase() === "exit") {
//         console.log(color.red("Exit Successfully !!!"));
//         break;
//       }
//       await fineTuning(contentsPromise + "/n/n/n/n" + userInput);
//     }
//     await fineTuning(userInput);
//   } catch (error) {
//     console.log(color.bold.red(error.message));
//   } finally {
//     rl.close();
//   }
// };

// const askQuestion = (question) => {
//   return new Promise((resolve) => {
//     rl.question(question, resolve);
//   });
// };

// askForText();
