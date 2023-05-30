require("dotenv").config();

const axios = require("axios");
const qrcode = require("qrcode-terminal");

const { exec } = require("child_process");

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

//AQUI
const INSTANCE_ID = process.env.INSTANCE_ID;
const INSTANCE_TOKEN = process.env.INSTANCE_TOKEN;
const generateQRCodeImage = () => {
  const url = `https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/qr-code/image`;

  return new Promise((resolve, reject) => {
    qrcode.generate(url, { small: true }, (qrcode) => {
      if (qrcode) {
        resolve(qrcode);
      } else {
        reject(new Error("Erro ao gerar o QR Code"));
      }
    });
  });
};

generateQRCodeImage()
  .then((qrcode) => {
    console.log("QR Code gerado com sucesso:");
    console.log(qrcode);
  })
  .catch((error) => {
    console.error("Erro ao gerar o QR Code:", error.message);
  });

module.exports = {
  sendWelcomeMessage,
  generateQRCodeImage,
};
