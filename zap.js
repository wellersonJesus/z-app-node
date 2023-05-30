const express = require("express");
const router = require("../z-app-nodejs/zapServer/router/zapRouter");
const { generateQRCodeImage } = require("../z-app-nodejs/zapServer/zapService");

const app = express();
const APP_PORT = process.env.APP_PORT;

app.use(express.json());
app.use("/", router);

generateQRCodeImage()
  .then((base64Image) => {
    console.log("QR Code em formato base64 válido:");
    console.log(base64Image);

    app.listen(APP_PORT, () => {
      console.log(`⚡⚡⚡.....Server is running on port ${APP_PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao gerar o QR Code:", error.message);
  });
