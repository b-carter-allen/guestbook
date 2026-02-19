require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.use(express.json());
app.use(express.static('public'));

app.get('/entries', async (req, res) => {
  const { data, error } = await supabase
    .from('entries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/entries', async (req, res) => {
  const { name, message } = req.body;
  if (!name?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Name and message are required.' });
  }

  const { data, error } = await supabase
    .from('entries')
    .insert({ name: name.trim(), message: message.trim() })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

if (require.main === module) {
  const PORT = process.env.PORT || 4567;
  app.listen(PORT, () => console.log(`Guestbook running at http://localhost:${PORT}`));
}

module.exports = app;
