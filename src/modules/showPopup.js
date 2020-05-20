const showPopup = () => {
  let popupAnchors = [];
  // Кнопка бесплатного визита
  if (document.querySelector('.open-popup'))
    popupAnchors.push(document.querySelector('.open-popup'));
  // Кнопка "Перезвоните мне"
  if (document.querySelector('.fixed-gift'))
    popupAnchors.push(document.querySelector('.fixed-gift'));
  // Подарок
  if (document.querySelector('.callback-btn'))
    popupAnchors.push(document.querySelector('.callback-btn'));

  popupAnchors.forEach(item => {
    let popup = document.querySelector(`${item.dataset.popup}`);

    let opacity;
    // Анимация появления модального окна
    const popupAppearance = function() {
      opacity = requestAnimationFrame(popupAppearance);
  
      if (popup.style.opacity < 1)
      popup.style.opacity = +popup.style.opacity + 0.05;
      else
        cancelAnimationFrame(opacity);
    }

    // Появление модального окна
    item.addEventListener('click', () => {
      console.log(item);
      
      // Проверка ширина окна для активации анимации
      if (document.documentElement.clientWidth > 768) {
        popup.style.opacity = 0;
        popup.style.display = 'block';
        requestAnimationFrame(popupAppearance(popup));
      } else {
          popup.style.display = 'block';
      }
    });

    // Закрытие модального окна
    popup.addEventListener('click', (event) => {
      if (event.target.closest('.close-btn') ||
          event.target.closest('.close_icon') ||
          event.target.closest('.overlay')) {
      popup.style.display = 'none';
      //Скрытие подарка
      if (item.classList.value === 'fixed-gift')
        item.style.display = 'none';
      }
    })
  });
}

export default showPopup;