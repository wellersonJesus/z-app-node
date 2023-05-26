const { sendMessage } = require("../z-app-nodejs/services/send-message");
const { sendButtonActions } = require("./services/send-button");
const { initQuestions } = require("./prompt/questions");

const apiUrl = `http://localhost:${process.env.APP_PORT || 4001}`;
const phone = "5531999448369";
const message = "WhatsApp Server";

const startApp = async () => {
  try {
    await initQuestions(apiUrl);
    await sendMessage(apiUrl, phone, message);
    sendButtonActions();
  } catch (error) {
    console.error("Ocorreu um erro ao iniciar o aplicativo:", error);
  }
};

startApp();
