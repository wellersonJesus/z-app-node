require("dotenv").config();

const inquirer = require("inquirer");
const { sendMessage } = require("../services/send-message");
const axios = require("axios");

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
        choices: ["Mensagem", "Imagem", "Menu"],
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
          sendMessage(INSTANCE_API, answers.phone, answers.message)
            .then(() => console.log("Mensagem enviada com sucesso."))
            .catch((error) =>
              console.error("Erro ao enviar a mensagem:", error)
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
              title: "se quiser vincular um titulo",
              footer: "se quiser vincular um rodape top",
              buttonActions: [
                {
                  id: "1",
                  type: "CALL",
                  phone: "+554498398733",
                  label: "Fale conosco",
                },
                {
                  id: "2",
                  type: "URL",
                  url: "https://z-api.io",
                  label: "Visite nosso site",
                },
                { id: "3", type: "REPLY", label: "Falar com atendente" },
              ],
            },
          };

          axios(menuOptions)
            .then((response) => {
              console.log("Menu enviado com sucesso.");
              console.log(response.data);
            })
            .catch((error) =>
              console.error("Erro ao enviar o menu:", error.response.data)
            );

          break;
      }
    })
    .catch((error) => console.error("Erro ao executar as perguntas:", error));
};

module.exports = { initQuestions };
