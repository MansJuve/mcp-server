const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/agent", async (req, res) => {
  const { input } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [{ role: "user", content: input }],
    });

    const output = completion.data.choices[0].message.content;
    res.json({ output });
  } catch (error) {
    console.error("Ошибка OpenAI:", error.message);
    res.status(500).json({ error: "Ошибка обработки запроса." });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("MCP Server with GPT is running");
});
