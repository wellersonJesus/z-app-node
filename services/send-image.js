const inquirer = require("inquirer");

const sendMessage = require("../services/send-message");
const sendAudio = require("../services/send-audio");
const sendImage = require("../services/send-image");
const sendVideo = require("../services/send-video");

const initQuestions = (INSTANCE_API) => {
  if (!INSTANCE_API) {
    return console.error(
      `Informe a API da instância no arquivo index.js e execute novamente.`
    );
  }
  inquirer
    .prompt([
      // restante do código...
    ])
    .then((answers) => {
      switch (answers.messageType) {
        case "Mensagem":
          sendMessage.sendTextMessage(
            INSTANCE_API,
            answers.phone,
            answers.message
          );
          break;
        case "Imagem":
        // restante do código...
      }
    });
};

module.exports = { initQuestions };
