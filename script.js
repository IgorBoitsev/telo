'use strict';

// Бургер меню
const burgerMenu = () => {
  const menuBtn = document.querySelector('.menu-button').querySelector('img'),
        popupMenu = document.querySelector('.popup-menu'),
        topMenu = document.querySelector('.top-menu'),
        head = document.querySelector('.head');
  
  menuBtn.addEventListener('click', () => {
    popupMenu.style.display = 'flex';
  });

  popupMenu.addEventListener('click', (event) => {
    if (event.target.closest('li') || event.target.closest('.close-menu-btn')) {
      popupMenu.style.display = 'none';
    }
  });

  // Исходное положение прилипшего меню, если при перезагрузке страницы уже проскролено
  if (document.documentElement.scrollTop > head.offsetHeight) {
    topMenu.style.position = 'fixed';
    head.style.marginBottom = '59.66px';
  }

  // Фиксация бургер меню при прокруте
  const fixedMenu = () => {
    // Текушее прокрутка
    let topMenuCurrentScroll = document.documentElement.scrollTop;
    
  if (topMenuCurrentScroll > head.offsetHeight) {
      topMenu.style.position = 'fixed';
      head.style.marginBottom = '59.66px';
    } else {
        topMenu.style.position = '';
        head.style.marginBottom = '';
    }
  }

  window.addEventListener('scroll', fixedMenu);
}

burgerMenu();

// ------------------------------------------------------------
// Выбор клуба из падающего меню
const chooseClubBtn = () => {
  const clubsList = document.querySelector('.clubs-list'),
        clubsListUl = clubsList.querySelector('ul');

  clubsList.addEventListener('click', () => {
    if (clubsListUl.style.display === '' || clubsListUl.style.display === 'none') {
      clubsListUl.style.display = 'block';
    } else {
      clubsListUl.style.display = 'none';
    }
  });
}

chooseClubBtn();

// ------------------------------------------------------------
// Стрелка возврата наверх
const upArrowBtn = () => {
  const toTopBtn = document.querySelector('#totop'),
        clubs = document.querySelector('#clubs'),
        clubsToTop = clubs.getBoundingClientRect().top;

  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > clubsToTop) {
      toTopBtn.style.display = 'block';
    } else {
        toTopBtn.style.display = 'none';
    }
  });
}

upArrowBtn();

const showPopup = () => {
  let popupAnchors = [];
  // Кнопка бесплатного визита
  popupAnchors.push(document.querySelector('.open-popup'));
  // Кнопка "Перезвоните мне"
  popupAnchors.push(document.querySelector('.fixed-gift'));
  // Подарок
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
      }
    })
  });
}

showPopup();

// ------------------------------------------------------------
// Калькулятор
const calculator = () => {
  const cardOrder = document.querySelector('#card_order'),
        cardTypes = document.querySelectorAll('[name="card-type"]'),
        clubNames = document.querySelectorAll('[name="club-name"]'),
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

calculator();

// ------------------------------------------------------------
// Главный слайдер
const mainSlider = () => {
  const headSlider = document.querySelector('.head-slider'),
        mainSlider = document.querySelector('.main-slider'),
        slides = mainSlider.querySelectorAll('.slide');
  let currentSlide = 0;
  
  const autoPlay = () => {
    slides[currentSlide].style.display = 'none';
    currentSlide++;

    if (currentSlide >= (slides.length - 1))
      currentSlide = 0;

    slides[currentSlide].style.display = 'flex';
  }

  setInterval(autoPlay, 2000); 
}

mainSlider();

// ------------------------------------------------------------
// Фотогалерея
const photoGallery = () => {
  const gallerySlider = document.querySelector('.gallery-slider'),
        arrowPrev = gallerySlider.querySelector('.prev'),
        arrowNext = gallerySlider.querySelector('.next'),
        slides = gallerySlider.querySelectorAll('.slide'),
        sliderDots = gallerySlider.querySelector('.slider-dots');

  // Вставка кнопок по количеству слайдов
  for (let i = 0; i < slides.length; i++)
    sliderDots.insertAdjacentHTML('beforeend', '<li><button></button></li>');
  sliderDots.querySelectorAll('li')[0].classList.add('slick-active');
  

  
}

photoGallery();