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
                    'Поправки ніг',
                    'Інше'
                ],
                vehiclePlaceholder: 'Не водій',
                datePlaceholder: 'Оберіть дату',
                addButton: 'Додати роботу',
                submitButton: 'Відправити',
                timePlaceholder: 'Години'
            },
            pl: {
                title: 'Ewidencja czasu pracy',
                namePlaceholder: 'Twoje imię',
                jobOptions: [
                    'Montaż ogrodzenia',
                    'Montaż konstrukcji',
                    'Montaż uziemienia',
                    'Montaż kabli',
                    'Korekty nóg',
                    'Inne'
                ],
                vehiclePlaceholder: 'Nie kierowca',
                datePlaceholder: 'Wybierz datę',
                addButton: 'Dodaj pracę',
                submitButton: 'Wyślij',
                timePlaceholder: 'Godziny'
            },
            uz: {
                title: 'Ish vaqti hisoboti',
                namePlaceholder: 'Ismingiz',
                jobOptions: [
                    'Devor o\'rnatish',
                    'Konstruksiyani o\'rnatish',
                    'Yerga ulashni o\'rnatish',
                    'Kabel o\'rnatish',
                    'Oyoq tuzatish',
                    'Boshqa'
                ],
                vehiclePlaceholder: 'Haydovchi emas',
                datePlaceholder: 'Sana tanlang',
                addButton: 'Ish qo\'shish',
                submitButton: 'Jo\'natish',
                timePlaceholder: 'Soatlar'
            }
        };

        const translation = translations[lang];
        if (translation) {
            $('#title').text(translation.title);
            $('#name option:first').text(translation.namePlaceholder);
            $('#workItems .work-type option').each(function(index) {
                if (index > 0) $(this).text(translation.jobOptions[index - 1]);
            });
            $('#vehicle option:first').text(translation.vehiclePlaceholder);
            $('#date').attr('placeholder', translation.datePlaceholder);
            $('#addWorkButton').text(translation.addButton);
            $('#submitButton').text(translation.submitButton);
            $('#workItems .work-time').attr('placeholder', translation.timePlaceholder);
        }
    }

    // Добавление работы
    $('#addWorkButton').on('click', function() {
        const newWorkItem = `
            <div class="work-item d-flex align-items-center mb-3">
                <select class="form-select work-type" name="workType[]" required>
                    <option value="" disabled selected>Выберите работу</option>
                    <option value="Монтаж забора">Монтаж забора</option>
                    <option value="Монтаж конструкции">Монтаж конструкции</option>
                    <option value="Монтаж заземления">Монтаж заземления</option>
                    <option value="Монтаж кабеля">Монтаж кабеля</option>
                    <option value="Поправки ног">Поправки ног</option>
                    <option value="Other">Другое</option>
                </select>
                <input type="number" class="form-control work-time ms-2" name="workTime[]" placeholder="Часы" min="1" max="12" required>
                <input type="text" class="form-control other-work-input ms-2" name="otherWork[]" placeholder="Уточните работу" style="display: none;">
                <button type="button" class="btn btn-danger ms-2 btn-remove-work"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;

        $('#workItems').append(newWorkItem);
        workCount++;
    });

    // Удаление работы
    $(document).on('click', '.btn-remove-work', function() {
        $(this).closest('.work-item').remove();
    });

    // Показать поле "Уточните работу" для "Другое"
    $(document).on('change', '.work-type', function() {
        const otherInput = $(this).closest('.work-item').find('.other-work-input');
        if ($(this).val() === 'Other') {
            otherInput.show();
            otherInput.attr('required', true);
        } else {
            otherInput.hide();
            otherInput.removeAttr('required');
        }
    });
});
