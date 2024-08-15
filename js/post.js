const scriptURL = 'https://script.google.com/macros/s/AKfycbz1Uyy70zITbOfbJ7b6EXlT9t6ORSBdUYFTt7RAvxVxK21XdcJrloZ6faG6MwkZxdkbeg/exec';
const form = document.forms['submit-to-google-sheet'];

form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = {
    name: formData.get('name'),
    date: formData.get('date'),
    workItems: [],
    vehicle: formData.get('vehicle'),
    themeToggle: formData.get('themeToggle') === 'on',
    language: formData.get('language')
  };

  // Собираем данные о работах
  document.querySelectorAll('.work-item').forEach(item => {
    const workType = item.querySelector('.work-type').value;
    const workTime = item.querySelector('.work-time').value;
    data.workItems.push({
      workType: workType,
      workTime: workTime
    });
  });

  // Отправляем данные
  fetch(scriptURL, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
    .then(response => response.json())
    .then(result => console.log('Success:', result))
    .catch(error => console.error('Error:', error));
});
