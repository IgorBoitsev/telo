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