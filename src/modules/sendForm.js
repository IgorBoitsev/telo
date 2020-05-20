const sendForm = () => {
  const forms = document.querySelectorAll('form'),
        bannerForm = document.querySelector('#banner-form'),
        check1 = bannerForm.querySelector('#check1'),
        nameInput = bannerForm.querySelector('[name="name"]'),
        phoneInput = bannerForm.querySelector('[name="phone"]'),
        sendBtn = bannerForm.querySelector('[name="send"]'),
        thanks = document.querySelector('#thanks'),
        thanksH4 = thanks.querySelector('h4'),
        thanksPar = thanks.querySelector('p');
    
  // Запрет ввода символов кроме кириллицы
  document.querySelectorAll('[name="name"]').forEach(item => {
    item.addEventListener('input', () => item.value = item.value.replace(/[^а-яёА-ЯЁ]/, ''));
  })

  // Запрет ввода символов кроме цифр и +
  document.querySelectorAll('[name="phone"]').forEach(item => {
    item.addEventListener('input', () => item.value = item.value.replace(/[^+0-9]/, ''));
  })

  // check1.addEventListener('input', () => console.log(1));

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
  
      // Получение данных из формы
      const formData = new FormData(bannerForm);
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
      if (item.closest('#callback_form'))
        document.querySelector('#callback_form').style.display = 'none';

      thanks.style.display = 'block';
    });
  })

  thanks.addEventListener('click', (event) => {
    if (event.target.closest('.overlay') ||
        event.target.closest('.close_icon') ||
        event.target.closest('.close-btn'))
      thanks.style.display = 'none';
  });
}

export default sendForm;