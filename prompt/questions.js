require("dotenv").config();
const inquirer = require("inquirer");
const { sendMessage } = require("../services/send-message");
const { sendButtonActions } = require("../services/send-button");
const { sendMenuMessage } = require("../services/send-menu-message");

const initQuestions = (instanceAPI) => {
  if (!instanceAPI) {
    return console.error(
      "Informe a API da instância no arquivo index.js e execute novamente."
    );
  }

  inquirer
    .prompt([
      {
        type: "list",
        name: "messageType",
        message: "O que deseja testar?",
        choices: [
          "Mensagem",
          "Imagem",
          "Audio",
          "Video",
          "Menu",
          "MenuMessage",
        ],
      },
      {
        type: "input",
        when: (questions) => questions.messageType !== "Mensagem",
        name: "fileURL",
        message:
          "Informe a URL do arquivo ou pressione ENTER para utilizar o padrão de exemplo",
        validate: function (input) {
          const done = this.async();
          if (!input || input.startsWith("http")) {
            done(null, true);
          } else {
            done("Por favor, informe uma URL válida.");
          }
        },
      },
      {
        type: "input",
        when: (questions) => questions.messageType === "Mensagem",
        name: "message",
        default: "Esse é um exemplo utilizando o *Z-API* 😜",
        message:
          "Digite uma mensagem ou pressione ENTER para utilizar o exemplo",
        validate: function (input) {
          const done = this.async();
          if (input && input.replace(/ /g, "").length > 0) {
            done(null, true);
          } else {
            done("Por favor, informe uma mensagem.");
          }
        },
      },
      {
        type: "input",
        name: "phone",
        message: "Para quem deseja enviar? (Whatsapp do destinatário)",
        default: "",
        validate: function (input) {
          const done = this.async();
          if (input && input.replace(/ /g, "").length > 0) {
            done(null, true);
          } else {
            done(
              "Por favor, digite o destinatário com DDI, DDD e número. Exemplo: 5531999448369"
            );
          }
        },
      },
    ])
    .then((answers) => {
      switch (answers.messageType) {
        case "Mensagem":
          sendMessage(instanceAPI, answers.phone, answers.message)
            .then(() => console.log("Mensagem enviada com sucesso."))
            .catch((error) =>
              console.error("Erro ao enviar a mensagem:", error)
            );
          break;
        case "Imagem":
          sendImage(
            instanceAPI,
            answers.phone,
            answers.fileURL ||
              "https://static.mundoeducacao.bol.uol.com.br/mundoeducacao/conteudo/sai-verde.jpg"
          );
          break;
        case "Audio":
          sendAudio(
            instanceAPI,
            answers.phone,
            answers.fileURL ||
              "https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3"
          );
          break;
        case "Video":
          sendVideo(
            instanceAPI,
            answers.phone,
            answers.fileURL ||
              "https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_480_1_5MG.mp4"
          );
          break;
        case "Menu":
          sendButtonActions(instanceAPI, answers.phone, answers.message)
            .then(() => console.log("Menu enviado com sucesso."))
            .catch((error) => console.error("Erro ao enviar o menu:", error));
          break;
        case "MenuMessage":
          sendMenuMessage(instanceAPI, answers.phone, answers.message)
            .then(() => console.log("Message Menu enviado com sucesso."))
            .catch((error) => console.error("Erro ao enviar o menu:", error));
          break;
      }
    })
    .catch((error) => console.error("Erro ao executar as perguntas:", error));
};

module.exports = { initQuestions };
