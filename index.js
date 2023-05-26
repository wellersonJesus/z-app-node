const { initQuestions } = require("./prompt/questions");

const INSTANCE_API = process.env.INSTANCE_API;

const startApp = async () => {
  try {
    await initQuestions(INSTANCE_API);
  } catch (error) {
    console.error("Ocorreu um erro ao iniciar o aplicativo:", error);
  }
};

startApp();
