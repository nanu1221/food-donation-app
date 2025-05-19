
document.getElementById('donateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const item = document.getElementById('item').value;
    const quantity = +document.getElementById('quantity').value;
  
    const res = await fetch('/api/donate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item, quantity })
    });
  
    if (res.ok) loadChart();
  });async function loadChart() {
    const res = await fetch('/api/stats');
    const data = await res.json();
    const ctx = document.getElementById('donationChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(d => d.name),
        datasets: [{
          label: 'Donations',
          data: data.map(d => d.quantity),
          backgroundColor: 'rgba(54, 162, 235, 0.5)'
        }]
      }
    });
  }