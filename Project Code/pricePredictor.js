document.getElementById("btn-sell-submit").addEventListener('submit', function(event) {
    event.preventDefault();
  
    const formData = new FormData(this);
    const inputData = formData.get('inputData');
  
    // Send form data to the server
    fetch('/prediction-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputData }),
    })
    .then(response => response.json())
    .then(data => {
      // Display the server response
      document.getElementById('prediction-response').textContent = `Server Response: ${data.response}`;
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  