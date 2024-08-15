document.getElementById('workForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const data = {
        name: formData.get('name'),
        date: formData.get('date'),
        workType: formData.get('workType'),
        workTime: formData.get('workTime'),
        otherWork: formData.get('otherWork'),
        vehicle: formData.get('vehicle'),
        themeToggle: formData.get('themeToggle'),
        language: formData.get('language')
    };

    fetch('https://script.google.com/macros/s/AKfycbw13JnkTJevmcwaKyCv-94Mf2vqVDs1xR0H9O9firQucjFb_Lg-4FyjV-5im2ocMqcqxA/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        // Дополнительно, очистите форму или покажите сообщение пользователю
        form.reset();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
