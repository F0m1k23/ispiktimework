$(document).ready(function() {
    let workCount = 1;

    // Переключение темы
    $('#themeToggle').on('change', function() {
        $('body').toggleClass('dark-theme', $(this).is(':checked'));
        localStorage.setItem('theme', $(this).is(':checked') ? 'dark' : 'light');
    });

    // Сохранение и восстановление темы
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        $('body').toggleClass('dark-theme', savedTheme === 'dark');
        $('#themeToggle').prop('checked', savedTheme === 'dark');
    }

    // Изменение языка
    $('#language').on('change', function() {
        const lang = $(this).val();
        changeLanguage(lang);
    });

    // Функция для изменения языка
    function changeLanguage(lang) {
        const translations = {
            ru: {
                title: 'Учет рабочего времени',
                namePlaceholder: 'Ваше имя',
                jobOptions: [
                    'Монтаж забора',
                    'Монтаж конструкции',
                    'Монтаж заземления',
                    'Монтаж кабеля',
                    'Поправки ног',
                    'Другое'
                ],
                vehiclePlaceholder: 'Не водитель',
                datePlaceholder: 'Выберите дату',
                addButton: 'Добавить работу',
                submitButton: 'Отправить',
                timePlaceholder: 'Часы'
            },
            uk: {
                title: 'Облік робочого часу',
                namePlaceholder: 'Ваше ім’я',
                jobOptions: [
                    'Монтаж паркану',
                    'Монтаж конструкції',
                    'Монтаж заземлення',
                    'Монтаж кабелю',
                    'Виправлення ніг',
                    'Інше'
                ],
                vehiclePlaceholder: 'Не водій',
                datePlaceholder: 'Оберіть дату',
                addButton: 'Додати роботу',
                submitButton: 'Відправити',
                timePlaceholder: 'Години'
            },
            pl: {
                title: 'Rejestr Czasu Pracy',
                namePlaceholder: 'Twoje imię',
                jobOptions: [
                    'Montaż ogrodzenia',
                    'Montaż konstrukcji',
                    'Montaż uziemienia',
                    'Montaż kabla',
                    'Poprawki nóg',
                    'Inne'
                ],
                vehiclePlaceholder: 'Nie kierowca',
                datePlaceholder: 'Wybierz datę',
                addButton: 'Dodaj pracę',
                submitButton: 'Wyślij',
                timePlaceholder: 'Godziny'
            },
            uz: {
                title: 'Ish Vaqti Hisoboti',
                namePlaceholder: 'Ismingiz',
                jobOptions: [
                    'To‘siq o‘rnatish',
                    'Konstruktsiyani o‘rnatish',
                    'Yerga ulash tizimini o‘rnatish',
                    'Kabellarni o‘rnatish',
                    'Tuzatishlar',
                    'Boshqa'
                ],
                vehiclePlaceholder: 'Haydovchi emas',
                datePlaceholder: 'Sana tanlang',
                addButton: 'Ish qo‘shish',
                submitButton: 'Yuborish',
                timePlaceholder: 'Soatlar'
            }
        };

        const t = translations[lang] || translations.ru;

        $('#title').text(t.title);
        $('#name').find('option').each(function(index) {
            $(this).text(index === 0 ? t.namePlaceholder : $(this).val());
        });
        $('#vehicle').find('option').each(function(index) {
            $(this).text(index === 0 ? t.vehiclePlaceholder : $(this).val());
        });
        $('#date').attr('placeholder', t.datePlaceholder);
        $('#addWorkButton').html(`<i class="fas fa-plus"></i> ${t.addButton}`);
        $('#submitButton').text(t.submitButton);
        $('.work-type').each(function(index) {
            $(this).find('option').each(function(idx, option) {
                $(option).text(t.jobOptions[idx] || $(option).val());
            });
        });
        $('.work-time').attr('placeholder', t.timePlaceholder);
    }

    // Инициализация языка
    const initialLang = $('#language').val();
    changeLanguage(initialLang);

    // Добавление новой работы
    $('#addWorkButton').on('click', function() {
        workCount++;
        const workItem = `
            <div class="work-item d-flex align-items-center mb-3">
                <select class="form-select work-type" required>
                    <option value="" disabled selected>Выберите работу</option>
                    <option value="Монтаж забора">Монтаж забора</option>
                    <option value="Монтаж конструкции">Монтаж конструкции</option>
                    <option value="Монтаж заземления">Монтаж заземления</option>
                    <option value="Монтаж кабеля">Монтаж кабеля</option>
                    <option value="Поправки ног">Поправки ног</option>
                    <option value="Other">Другое</option>
                </select>
                <input type="number" class="form-control work-time ms-2" placeholder="Часы" min="1" max="12" required>
                <input type="text" class="form-control other-work-input ms-2" placeholder="Уточните работу" style="display: none;">
                <button type="button" class="btn btn-danger ms-2 btn-remove-work"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;
        $('#workItems').append(workItem);
    });

    // Удаление работы
    $('#workItems').on('click', '.btn-remove-work', function() {
        $(this).closest('.work-item').remove();
    });

    // Отправка формы
    $('#submitBtn').click(function(event) {
        event.preventDefault();
      
        var formData = {
          name: $('#name').val(),
          date: $('#date').val(),
          works: [],
          machines: $('#machines').val(),
          additional: $('#additional').val()
        };
      
        $('#workItems .work-item').each(function() {
          var workType = $(this).find('.work-type').val();
          var workTime = $(this).find('.work-time').val();
          var otherWork = $(this).find('.other-work-input').val();
      
          if (workType === 'Other' && otherWork) {
            workType = otherWork;
          }
      
          if (workType && workTime) {
            formData.works.push({ type: workType, time: workTime });
          }
        });
      console.log(formData)
        $.ajax({
            url: 'https://script.google.com/macros/s/AKfycbzzpQ5KxBsNcDv68TTDhDzJFR2Y6nxPTteMFgFF1OCsvj_8fUpqO-0ncjxzbnFxNqntnw/exec',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
              console.log('Response:', response); // Выводим ответ сервера в консоль
              alert('Форма успешно отправлена!');
              $('#workForm')[0].reset();
              $('#workItems').empty();
            },
            error: function(xhr, status, error) {
              alert('Ошибка при отправке формы');
              console.error('Status:', status);
              console.error('Error:', error);
              console.error('Response:', xhr.responseText);
            }
          });
      });
      

    // Отображение уточнения работы
    $('#workItems').on('change', '.work-type', function() {
        const otherInput = $(this).closest('.work-item').find('.other-work-input');
        if ($(this).val() === 'Other') {
            otherInput.show();
        } else {
            otherInput.hide();
        }
    });

    // Проверка и исправление времени
    $('#workItems').on('input', '.work-time', function() {
        let time = $(this).val();
        if (time < 1) $(this).val(1);
        if (time > 12) $(this).val(12);
    });
});
