import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get('/api/donations', async (req, res) => {
  const { data, error } = await supabase.from('donations').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/api/donations', async (req, res) => {
  const { foodItem, quantity } = req.body;

  if (!foodItem || !quantity) {
    return res.status(400).json({ error: 'foodItem and quantity are required' });
  }

  const { data, error } = await supabase
    .from('donations')
    .insert([{ food_item: foodItem, quantity }]);

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ message: 'Donation received', data });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
