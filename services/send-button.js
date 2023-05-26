const { sendMessage } = require("./send-message");
const { generateProtocolNumber } = require("../prompt/protocol");

const sendButtonActions = async (instanceAPI, phone, message) => {
  const protocolNumber = generateProtocolNumber();

  const options = {
    method: "POST",
    url: instanceAPI,
    headers: { "content-type": "application/json" },
    data: {
      phone,
      message: `Seu protocolo de atendimento: ${protocolNumber}`,
      title: "Bem-vindo! Ao atendimento Virtual",
      footer: `Protocolo: ${protocolNumber}`,
      buttonActions: [
        { id: "1", type: "REPLY", label: "CONSULTA ATOS" },
        { id: "2", type: "REPLY", label: "FIRMAS" },
        { id: "3", type: "REPLY", label: "ESCRITURAS E PROCURAÇÕES" },
        { id: "4", type: "REPLY", label: "PEDIDOS DE CERTIDÃO" },
      ],
    },
  };

  try {
    await sendMessage(
      options.url,
      options.data.phone,
      options.data.message,
      protocolNumber
    );

    console.log(`Mensagem enviada com sucesso. Protocolo: ${protocolNumber}`);

    if (options.data.buttonActions) {
      const menuMessage = options.data.buttonActions
        .map((action) => `${action.id}. ${action.label}`)
        .join("\n");

      await sendMessage(options.url, options.data.phone, menuMessage);

      console.log("Menu enviado com sucesso.");
    } else {
      console.error("Nenhuma ação de botão encontrada.");
    }
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    throw error;
  }
};

module.exports = { sendButtonActions };
