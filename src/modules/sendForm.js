const sendForm = () => {
  const forms = document.querySelectorAll('form'),
        thanks = document.querySelector('#thanks'),
        agreement = document.querySelector('#agreement'),
        thanksH4 = thanks.querySelector('h4'),
        thanksPar = thanks.querySelector('p');
   
  // Запрет ввода символов кроме кириллицы
  document.querySelectorAll('[name="name"]').forEach(item => {
    item.addEventListener('input', () => item.value = item.value.replace(/[^а-яёА-ЯЁ]/, ''));
  })

  // Запрет ввода символов кроме цифр и +
  document.querySelectorAll('[name="phone"]').forEach(item => {
    item.addEventListener('input', () => item.value = item.value.replace(/[^+0-9 \-()]/, ''));
  })

  const postData = (body) => {
    return fetch('./server.php', {
                 method: 'POST',
                 headers: {
                   'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(body)
                });
  }

  forms.forEach(item => {
    item.addEventListener('submit', (event) => {
      event.preventDefault();

      const checkbox = item.querySelector('[type="checkbox"]');

      // Проверка установки галочки соглашения обработки персональных данных
      if (checkbox && !checkbox.checked){
        agreement.style.display = 'block';
        return;
      }

      // Получение данных из формы
      const formData = new FormData(item);
      let body = {};
      formData.forEach((val, key) => body[key] = val);
  
      postData(body)
        .then((response) => {
          if (response.status != 200)
            throw new Error('Ошибка 200');
        })
        .catch((error) => {
          thanksH4.textContent = 'Оп!';
          thanksPar.textContent = 'Возникли непредвиденные обстоятельства';
        })
        .finally(() => {
          item.querySelectorAll('input').forEach(elem => elem.value = '')
        })
      
      // Скрытие модального окна, если из него идет отправка заявки
      if (item.closest('#callback_form') || item.closest('#free_visit_form')){
        document.querySelector('#callback_form').style.display = 'none';
        document.querySelector('#free_visit_form').style.display = 'none';
      }

      thanks.style.display = 'block';
    });
  })

  thanks.addEventListener('click', (event) => {
    if (event.target.closest('.overlay') ||
        event.target.closest('.close_icon') ||
        event.target.closest('.close-btn'))
      thanks.style.display = 'none';
  });

  agreement.addEventListener('click', (event) => {
    if (event.target.closest('.overlay') ||
        event.target.closest('.close_icon') ||
        event.target.closest('.close-btn'))
      agreement.style.display = 'none';
  });
}

export default sendForm;