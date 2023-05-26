const inquirer = require("inquirer");

const sendMessage = require("../services/send-message");

const initQuestions = (INSTANCE_API) => {
  if (!INSTANCE_API) {
    return console.error(
      `Informe a API da instância no arquivo index.js e execute novamente.`
    );
  }
  inquirer.prompt([]).then((answers) => {
    switch (answers.messageType) {
      case "Mensagem":
        sendMessage.sendTextMessage(
          INSTANCE_API,
          answers.phone,
          answers.message
        );
        break;
      case "Imagem":
    }
  });
};

module.exports = { initQuestions };
