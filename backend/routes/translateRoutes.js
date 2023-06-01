const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({ apiKey: process.env.API_KEY });

const openai = new OpenAIApi(configuration);

// Configurar los encabezados CORS para permitir las solicitudes desde el origen del front-end
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

router.post('/', async (req, res) => {
  const { document, prompt } = req.body;

  try {
    const result = await openai.createEdit({
      "model": "text-davinci-edit-001",
      "input": document,
      "instruction": prompt,
      "temperature": 0.3
    });

    console.log(result.data.choices[0].text);

    // const edit = result.edits[0].output;
    const edit = result.data.choices[0].text;

    res.json({ data: edit });
  } catch (error) {
    console.error('Error al crear una edición de texto:', error);
    res.status(500).json({ error: 'Error al crear una edición de texto' });
  }
});

module.exports = router;
