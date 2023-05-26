const axios = require("axios");

const generateProtocolNumber = () => {
  const protocolNumber = Math.floor(10000000 + Math.random() * 90000000);
  return protocolNumber.toString();
};

const sendMessage = async (apiUrl, phone, message) => {
  try {
    const options = {
      method: "POST",
      url: apiUrl,
      headers: { "content-type": "application/json" },
      data: {
        phone,
        message,
      },
    };

    const response = await axios.post(options.url, options.data, {
      headers: options.headers,
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    throw error;
  }
};

module.exports = { sendMessage, generateProtocolNumber };
