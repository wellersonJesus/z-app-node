const axios = require("axios");

const sendWelcomeMessage = async () => {
  const INSTANCE_ID = process.env.INSTANCE_ID;
  const INSTANCE_TOKEN = process.env.INSTANCE_TOKEN;
  const WHATSAPP_CONTACT = process.env.WHATSAPP_CONTACT;
  const message = "🙋‍♂️ Bem Vindo(a)\n\nAo atendimento *WhatsApp-Server*";

  try {
    const response = await axios.post(
      `https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-text`,
      {
        phone: WHATSAPP_CONTACT,
        message: message,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log("Mensagem de boas-vindas enviada com sucesso.");
    } else {
      console.error(
        "Erro ao enviar a mensagem de boas-vindas:",
        response.status
      );
    }
  } catch (error) {
    console.error("Erro ao enviar a mensagem de boas-vindas:", error.message);
  }
};

module.exports = {
  sendWelcomeMessage,
};
