const { sendButtonActions } = require("./send-button");

const sendResponseMenu = (selectedOption) => {
  return sendButtonActions().then(() => {
    const selectedAction = Array.isArray(options.buttonActions)
      ? options.buttonActions.find((action) => action.id === selectedOption?.id)
      : null;

    const message = `Opção selecionada: ${
      selectedAction ? selectedAction.label : "N/A"
    }`;

    return sendMessage(options.phone, message);
  });
};

module.exports = { sendResponseMenu };
