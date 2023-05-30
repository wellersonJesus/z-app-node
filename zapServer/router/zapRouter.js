const express = require("express");
const router = express.Router();
const { sendWelcomeMessage, generateQRCodeImage } = require("../zapService");

router.post("/welcome-message", async (req, res) => {
  try {
    await sendWelcomeMessage();
    res
      .status(200)
      .json({ message: "Mensagem de boas-vindas enviada com sucesso." });
  } catch (error) {
    console.error("Erro ao enviar a mensagem de boas-vindas:", error.message);
    res.status(500).json({ error: "Erro ao enviar a mensagem de boas-vindas" });
  }
});

router.get("/qrcode", async (req, res) => {
  try {
    const qrCodeImage = await generateQRCodeImage();
    res.status(200).json({ qrbase64img: qrCodeImage });
  } catch (error) {
    console.error("Erro ao gerar a imagem do QR Code:", error.message);
    res.status(500).json({ error: "Erro ao gerar a imagem do QR Code" });
  }
});

module.exports = router;
