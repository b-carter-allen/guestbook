const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const entries = [];

app.get('/entries', (req, res) => {
  res.json(entries.slice().reverse());
});

app.post('/entries', (req, res) => {
  const { name, message } = req.body;
  if (!name?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Name and message are required.' });
  }
  const entry = {
    id: Date.now(),
    name: name.trim(),
    message: message.trim(),
    timestamp: new Date().toISOString(),
  };
  entries.push(entry);
  res.status(201).json(entry);
});

// Local dev
if (require.main === module) {
  const PORT = process.env.PORT || 4567;
  app.listen(PORT, () => console.log(`Guestbook running at http://localhost:${PORT}`));
}

module.exports = app;
