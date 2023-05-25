const axios = require("axios");
const ora = require("ora");

const sendMessage = async (instanceAPI, phone, message) => {
  const spinner = ora("Enviando áudio para a API").start();
  try {
    await axios.post(instanceAPI, { phone, message });
    spinner.succeed("Mensagem enviada a fila de envios, deve chegar em breve.");
  } catch (e) {
    spinner.fail("Problemas ao enviar audio.");
  }
};

module.exports = { sendMessage };
