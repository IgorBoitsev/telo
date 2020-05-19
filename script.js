'use strict';

// Бургер меню
const burgerMenu = () => {
  const menuBtn = document.querySelector('.menu-button').querySelector('img'),
        popupMenu = document.querySelector('.popup-menu');
  
  menuBtn.addEventListener('click', () => {
    popupMenu.style.display = 'flex';
  });

  popupMenu.addEventListener('click', (event) => {
    if (event.target.closest('li') || event.target.closest('.close-menu-btn')) {
      popupMenu.style.display = 'none';
    }
  });
}

burgerMenu();

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