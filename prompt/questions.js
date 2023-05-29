require("dotenv").config();

const inquirer = require("inquirer");
const axios = require("axios");
const { generateProtocolNumber } = require("../prompt/protocol");

const initQuestions = () => {
  const INSTANCE_API = process.env.INSTANCE_API;

  if (!INSTANCE_API) {
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
        choices: ["Mensagem", "Imagem", "Audio", "Video", "Menu"],
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
              "Por favor, digite o destinatário com DDI, DDD e número. Exemplo: 5544999999999"
            );
          }
        },
      },
    ])
    .then((answers) => {
      switch (answers.messageType) {
        case "Mensagem":
          sendMessage(INSTANCE_API, answers.phone, answers.message)
            .then(() => console.log("Mensagem enviada com sucesso."))
            .catch((error) =>
              console.error("Erro ao enviar a mensagem:", error)
            );
          break;
        case "Imagem":
          sendImage(
            INSTANCE_API,
            answers.phone,
            answers.fileURL ||
              "https://static.mundoeducacao.bol.uol.com.br/mundoeducacao/conteudo/sai-verde.jpg"
          );
          break;
        case "Audio":
          sendAudio(
            INSTANCE_API,
            answers.phone,
            answers.fileURL ||
              "https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3"
          );
          break;
        case "Video":
          sendVideo(
            INSTANCE_API,
            answers.phone,
            answers.fileURL ||
              "https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_480_1_5MG.mp4"
          );
          break;
        case "Menu":
          const menuOptions = {
            method: "POST",
            url: `https://api.z-api.io/instances/${process.env.INSTANCE_ID}/token/${process.env.INSTANCE_TOKEN}/send-button-actions`,
            headers: { "content-type": "application/json" },
            data: {
              phone: answers.phone,
              message: answers.message,
              title:
                "🙋‍♂️ Bem-vindo(a)\n\nAo atendimento WhatsZap Service\nEscolha uma opção do MENU para continuar\n\nEste e o seu protocolo de atendimento\n\n👇👇👇\n",
              footer: `PROTOCOLO - ATENDIMENTO: ${generateProtocolNumber()}`,
              buttonActions: [
                // {
                //   id: "1",
                //   type: "CALL",
                //   phone: "+554498398733",
                //   label: "Fale conosco",
                // },
                // {
                //   id: "2",
                //   type: "URL",
                //   url: "https://z-api.io",
                //   label: "Visite nosso site",
                // },
                { id: "1", type: "REPLY", label: "CONSULTA ATOS" },
                { id: "2", type: "REPLY", label: "FIRMAS" },
                {
                  id: "3",
                  type: "REPLY",
                  label: "ESCRITURAS E PROCURAÇÕES",
                },
                { id: "4", type: "REPLY", label: "PEDIDOS DE CERTIDÃO" },
              ],
            },
          };

          axios(menuOptions)
            .then((response) => {
              console.log("Menu enviado com sucesso.");
              console.log(response.data);
            })
            .catch((error) => {
              console.error("Erro ao enviar o menu:", error);
            });

          break;
      }
    })
    .catch((error) => console.error("Erro ao executar as perguntas:", error));
};

module.exports = { initQuestions };
