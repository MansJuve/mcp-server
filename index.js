const express = require("express");
const app = express();
app.use(express.json());

app.post("/agent", (req, res) => {
  const { input } = req.body;
  res.json({ output: `Ответ агента: ${input}` });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("MCP Server is running");
});
