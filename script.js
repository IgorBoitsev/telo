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
const photoGallerySlider = () => {
  const gallerySlider = document.querySelector('.gallery-slider'),
        slides = gallerySlider.querySelectorAll('.slide'),
        sliderDots = gallerySlider.querySelector('.slider-dots');
  
        console.log(gallerySlider);
        

  // Вставка кнопок по количеству слайдов
  for (let i = 0; i < slides.length; i++)
    sliderDots.insertAdjacentHTML('beforeend', '<li class="dot"></li>');
  sliderDots.querySelectorAll('li')[0].classList.add('slick-active');

  // Набор кнопок для слайдера
  const sliderDotsLi = sliderDots.querySelectorAll('.dot');

  let currentSlide = 0,
      interval,
      opacity;
    
  // Функция добавления и удаления классов слайдам
  const prevSlide = (listOfItems, index, strClass) => listOfItems[index].classList.remove(strClass),
        nextSlide = (listOfItems, index, strClass) => listOfItems[index].classList.add(strClass);

  // Автоматическое перелистывание слайдов
  const autoPlayGallery = () => {

    prevSlide(slides, currentSlide, 'slide-active');
    prevSlide(sliderDotsLi, currentSlide, 'slick-active');
    currentSlide++;

    if (currentSlide >= slides.length)
      currentSlide = 0;

    nextSlide(slides, currentSlide, 'slide-active');
    nextSlide(sliderDotsLi, currentSlide, 'slick-active');
  }

  // Остановка слайдера
  const stopSlide = () => {
    clearInterval(interval);
  }

  // Возобновление работы слайдера
  const startSlide = () => {
    interval = setInterval(autoPlayGallery, 3000);
  }
  
  // Перелистывание слайдов нажатием на стрелки или на кнопки
  gallerySlider.addEventListener('click', (event) => {
    event.preventDefault();

    if (!event.target.matches('.slider-arrow, .dot')) return;

    prevSlide(slides, currentSlide, 'slide-active');
    prevSlide(sliderDotsLi, currentSlide, 'slick-active');

    if (event.target.matches('.next'))
      currentSlide++
      else if (event.target.matches('.prev'))
        currentSlide--;
        else if (event.target.matches('.dot'))
          sliderDotsLi.forEach((item, index) => {
            if (item === event.target) currentSlide = index;
          })
    
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;

    nextSlide(slides, currentSlide, 'slide-active');
    nextSlide(sliderDotsLi, currentSlide, 'slick-active');
  });

  // Останавка пролистывание при наведении на стрелки или кнопки
  gallerySlider.addEventListener('mouseover', (event) => {
    if (event.target.matches('.slider-arrow') || event.target.matches('.dot'))
      stopSlide();
  });

  // Возобновление пролистывания
  gallerySlider.addEventListener('mouseout', (event) => {
    if (event.target.matches('.slider-arrow') || event.target.matches('.dot'))
      startSlide();
  });

startSlide();
}

photoGallerySlider();

// ------------------------------------------------------------
// Слайдер-карусель
const sliderCarousel = () => {
  const services = document.querySelector('#services'),
        servicesSlider = document.querySelector('.services-slider'),
        slides = servicesSlider.querySelectorAll('.slide');
  

  if (document.documentElement.clientWidth >= 768) {
    // 5 слайдов на странице
    slides.forEach(item => {
      item.style.cssText = 'transform: translateX(0px); transition: all 0.5s';
    })
  } else if (document.documentElement.clientWidth < 768 && document.documentElement.clientWidth >= 600) {
      // 4 слайда на странице
      slides.forEach(item => {
        item.style.cssText = 'flex: 0 0 23.6%; transform: translateX(0px); transition: all 0.5s;';
      })
  } else if (document.documentElement.clientWidth < 600){
    // 3 слайда на странице
    slides.forEach(item => {
      item.style.cssText = 'flex: 0 0 32.3%; transform: translateX(0px); transition: all 0.5s';
    })
  }

  let pressCounter = 0;

  // Функция прокрутки слайдов
  const sliderChanger = () => {
    slides.forEach(item => {
      let slideWidth = +getComputedStyle(item).width.slice(0, -2),
          slideMarginRight = +getComputedStyle(item).marginRight.slice(0, -2);

      item.style.transform = `translateX(${-(slideWidth + slideMarginRight) * pressCounter}px)`;
    });
  }

  servicesSlider.addEventListener('click', (event) => {
    // Прокрутка слайдера вправо
    if (event.target.closest('.next')) {
      if (pressCounter < 5) {
        pressCounter++;
        sliderChanger();
      }
    }

    // Прокрутка слайдера влево
    if (event.target.closest('.prev')) {
      if (pressCounter > 0) {
        pressCounter--;
        sliderChanger();
      }
    }
  });
}

sliderCarousel();

// ------------------------------------------------------------
// Отправка данных с формы
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

sendForm();