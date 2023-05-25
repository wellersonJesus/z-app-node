const axios = require("axios");

const sendButtonActions = () => {
  const options = {
    method: "POST",
    url: process.env.INSTANCE_API,
    headers: { "content-type": "application/json" },
    data: {
      phone: "554499999999",
      message: "uma mensagem",
      title: "se quiser vincular um titulo",
      footer: "se quiser vincular um rodape top",
      buttonActions: [
        {
          id: "1",
          type: "CALL",
          phone: "+554498398733",
          label: "Fale conosco",
        },
        {
          id: "2",
          type: "URL",
          url: "https://z-api.io",
          label: "Visite nosso site",
        },
        { id: "3", type: "REPLY", label: "Falar com atendente" },
      ],
    },
  };

  axios
    .post(options.url, options.data, { headers: options.headers })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      throw new Error(error);
    });
};

module.exports = { sendButtonActions };
