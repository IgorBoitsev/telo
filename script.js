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

  // Исходное положение меню относительно верхнего края
  const topMenuOriginScroll = topMenu.getBoundingClientRect().top;

  const fixedMenu = () => {
    // Текушее прокрутка
    let topMenuCurrentScroll = document.documentElement.scrollTop;
    
  if (topMenuCurrentScroll > topMenuOriginScroll) {
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

// ------------------------------------------------------------
// Подарок
const gift = () => {
  const fixedGift = document.querySelector('.fixed-gift'),
        gift = document.querySelector('#gift');

  fixedGift.addEventListener('click', () => {
    fixedGift.style.display = 'none';
    gift.style.display = 'block';
  });

  gift.addEventListener('click', (event) => {
    if (event.target.closest('.close-btn') ||
        event.target.closest('.close_icon') ||
        event.target.closest('.overlay')) {
      gift.style.display = 'none';
    }
  });
}

gift();

// ------------------------------------------------------------
// Запись на бесплатный визит
const freeVisit = () => {
  const freeVisit = document.querySelector('.free-visit'),
        freeVisitForm = document.querySelector('#free_visit_form');

  freeVisit.addEventListener('click', () => freeVisitForm.style.display = 'block');

  freeVisitForm.addEventListener('click', (event) => {
    if (event.target.closest('.close-btn') ||
        event.target.closest('.close_icon') ||
        event.target.closest('.overlay')) {
          freeVisitForm.style.display = 'none';
    }
  });
}

freeVisit();

// ------------------------------------------------------------
// Калькулятор
const calculator = () => {
  const cardOrder = document.querySelector('#card_order'),
        cardTypes = document.querySelectorAll('[name="card-type"]'),
        // clubNames = document.querySelectorAll('[name="club-name"]'),
        promocodeName = document.querySelector('[name="promocode-name"]'),
        priceTotal = document.querySelector('#price-total');

  // Стоимость по умолчанию
  priceTotal.textContent = '1000';
  
  const countSum = () => {
    let cardTypeValue = 0,
        // clubNameValue = 0,
        promocodeNameValue = 1;

    cardTypes.forEach(item => {
      if (item.checked)
        cardTypeValue = +item.value;
      });

    if (promocodeName.value === 'ТЕЛО2019')
      promocodeNameValue = 0.7;

    priceTotal.textContent = 1000 * cardTypeValue * promocodeNameValue;
  }

  cardOrder.addEventListener('change', (event) => {
    if (event.target.name === 'card-type' || event.target.name === 'club-name' ||
        event.target.name === 'promocode-name')
      countSum()
  });
}

calculator();