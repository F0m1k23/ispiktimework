document.getElementById('workForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Собираем данные формы
    const formData = new FormData(this);
    let data = {
        name: formData.get('name'),
        date: formData.get('date'),
        vehicle: formData.get('vehicle'),
        workItems: []
    };

    // Собираем данные о работе
    const workTypes = document.querySelectorAll('.work-type');
    const workTimes = document.querySelectorAll('.work-time');
    const otherWorks = document.querySelectorAll('.other-work-input');

    for (let i = 0; i < workTypes.length; i++) {
        data.workItems.push({
            type: workTypes[i].value,
            time: workTimes[i].value,
            other: otherWorks[i].value || null
        });
    }

    console.log('Собранные данные:', data); // Проверочный вывод в консоль

    // Отправляем данные в Google Sheets
    fetch('https://script.google.com/macros/s/AKfycbyw_wcCLbeCgBmfaGL1yqUSBJhKMxkli5dcbJ2237qQn-PLsnxiaTnhqjm_CoFNzRGX/exec', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(result => {
        console.log('Успешно отправлено:', result);
        alert('Данные успешно отправлены!');
    })
    .catch(error => {
        console.error('Ошибка отправки:', error);
        alert('Произошла ошибка при отправке данных.');
    });
});
