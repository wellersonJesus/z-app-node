const axios = require("axios");
const ora = require("ora");

const sendMessage = async (instanceAPI, phone, message, protocolNumber) => {
  const spinner = ora("Enviando mensagem para a API").start();
  try {
    const response = await axios.post(instanceAPI, { phone, message });
    spinner.succeed(
      `Mensagem enviada com sucesso. Protocolo: ${protocolNumber}`
    );
    return response;
  } catch (e) {
    spinner.fail("Problemas ao enviar imagem.");
    spinner.fail("Problemas ao enviar audio.");
    spinner.fail("Problemas ao enviar video.");
    throw e;
  }
};

module.exports = { sendMessage };
