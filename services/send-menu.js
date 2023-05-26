const axios = require("axios");
const { sendMessage } = require("../services/send-message");

const generateProtocolNumber = () => {
  return Math.floor(10000000 + Math.random() * 90000000);
};

const sendButtonActions = () => {
  const protocolNumber = generateProtocolNumber();

  const options = {
    method: "POST",
    url: process.env.INSTANCE_API,
    headers: { "content-type": "application/json" },
    data: {
      phone: "5531999448369",
      message: `Seu protocolo de atendimento:\n👇👇👇\n\n${protocolNumber}`,
      title:
        "Bem-vindo! Ao atendimento Virtual\n\n👨‍💻 Por gentileza,\nSelecione uma opção desejada do menu logo abaixo:\n\n",
      footer: `Protocolo: ${protocolNumber}`,
      buttonActions: [
        { id: "1", type: "REPLY", label: "CONSULTA ATOS" },
        { id: "2", type: "REPLY", label: "FIRMAS" },
        { id: "3", type: "REPLY", label: "ESCRITURAS E PROCURAÇÕES" },
        { id: "4", type: "REPLY", label: "PEDIDOS DE CERTIDÃO" },
      ],
    },
  };

  return axios
    .post(options.url, options.data, { headers: options.headers })
    .then((response) => {
      const selectedOption = response.data?.selectedOption;

      const selectedAction = Array.isArray(options.buttonActions)
        ? options.buttonActions.find(
            (action) => action.id === selectedOption?.id
          )
        : null;

      const message = `Opção selecionada: ${
        selectedAction ? selectedAction.label : "N/A"
      }`;
      return sendMessage(options.data.phone, message)
        .then(() => {
          console.log("Mensagem enviada com sucesso.");
          return response;
        })
        .catch((error) => {
          console.error("Erro ao enviar a mensagem:", error);
          throw error;
        });
    })
    .catch((error) => {
      console.error("Ocorreu um erro:", error);
      throw error;
    });
};

module.exports = { sendButtonActions };
