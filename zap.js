const express = require("express");
const zapRouter = require("../z-app-nodejs/zapServer/router/zapRouter");

const app = express();
const APP_PORT = process.env.APP_PORT;

app.use(express.json());
app.use("/", zapRouter);

app.listen(APP_PORT, () => {
  console.log(`⚡⚡⚡.....Server is running on port ${APP_PORT}`);
});
