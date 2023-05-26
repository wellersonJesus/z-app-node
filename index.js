const axios = require("axios");
const { sendMessage } = require("../z-app-nodejs/services/send-message");
const { initQuestions } = require("./prompt/questions");

const INSTANCE_API = process.env.INSTANCE_API;
const phone = "5531999448369";
const message = "WhatsApp-server";

const startApp = async () => {
  try {
    await initQuestions(INSTANCE_API);
  } catch (error) {
    console.error("Ocorreu um erro ao iniciar o aplicativo:", error);
  }
};

startApp();

// Use as funções conforme necessário
sendMessage(INSTANCE_API, phone, message);
