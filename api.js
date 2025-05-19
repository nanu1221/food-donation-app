const express = require('express');
const router = express.Router();
const supabase = require('@supabase/supabase-js').createClient(
  'https://ngscpslpsudgkhtsmjdx.supabase.co',
  'YeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nc2Nwc2xwc3VkZ2todHNtamR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2MjQ2MzYsImV4cCI6MjA2MzIwMDYzNn0.vLOrDzgptkqz8JSbr46-peQUE6yYOMx7E5qd3BZiybQ'
);

router.get('/food', async (req, res) => {
  const { data, error } = await supabase.from('donations').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

router.post('/donate', async (req, res) => {
  const { item, quantity } = req.body;
  const { error } = await supabase.from('donations').insert([{ name: item, quantity }]);
  if (error) return res.status(500).json({ error });
  res.status(201).json({ message: 'Donation added!' });
});

router.get('/stats', async (req, res) => {
  const { data, error } = await supabase.from('donations').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

module.exports = router;


// vercel.json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" }
  ]
}