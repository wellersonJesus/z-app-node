const express = require("express");
const router = express.Router();
const { sendWelcomeMessage } = require("../zapService");

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

module.exports = router;
