const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get('/donations', async (req, res) => {
  const { data, error } = await supabase.from('donations').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/donation', async (req, res) => {
  const { name, food, quantity } = req.body;
  const { data, error } = await supabase.from('donations').insert([{ name, food, quantity }]);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Donation added', data });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
