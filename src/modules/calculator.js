const calculator = () => {
  if (document.title === 'Сеть фитнес клубов Тело') {
    const cardOrder = document.querySelector('#card_order'),
    cardTypes = document.querySelectorAll('[name="card-type"]'),
    clubNames = cardOrder.querySelectorAll('[name="club-name"]'),
    promocodeName = document.querySelector('[name="promocode-name"]'),
    priceTotal = document.querySelector('#price-total'),
    clubValues = {
      'mozaika' : {'1' : 1999,
                   '6' : 9990,
                   '9' : 13900,
                   '12' : 19900},
      'schelkovo' : {'1' : 2999,
                     '6' : 14999,
                     '9' : 21999,
                     '12' : 24990}
    };

    // Стоимость по умолчанию
    priceTotal.textContent = '1999';

    // Возможность ввода только кириллицы и цифр
    promocodeName.addEventListener('input', () => {
    promocodeName.value = promocodeName.value.replace(/[^а-яёА-ЯЁ\d]/g, '');
    });

    const countSum = () => {
    let cardTypeValue = 0,
        clubNameValue = 0,
        promocodeNameValue = 1;

    // Отслеживание выбранного клуба
    clubNames.forEach(item => {
      if (item.checked)
        clubNameValue = item.value;
    })

    // Отслеживание выбранного периода
    cardTypes.forEach(item => {
      if (item.checked)
        cardTypeValue = +clubValues[clubNameValue][item.value];
      });

    // Проверка промокода
    if (promocodeName.value === 'ТЕЛО2019')
      promocodeNameValue = 0.7;

    // Подсчет стоимости
    priceTotal.textContent = Math.ceil(cardTypeValue * promocodeNameValue);
    }

    cardOrder.addEventListener('change', (event) => {
    if (event.target.name === 'card-type' || event.target.name === 'club-name' ||
        event.target.name === 'promocode-name')
      countSum()
    });
  }
}

export default calculator;