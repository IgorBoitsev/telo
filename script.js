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