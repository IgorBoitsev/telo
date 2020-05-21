'use strict';

import 'nodelist-foreach-polyfill';
import '@babel/polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'fetch-polyfill';


import burgerMenu from './modules/burgerMenu';
import chooseClubBtn from './modules/chooseClubBtn';
import upArrowBtn from './modules/upArrowBtn';
import showPopup from './modules/showPopup';
import calculator from './modules/calculator';
import mainSlider from './modules/mainSlider';
import photoGallerySlider from './modules/photoGallerySlider';
import sliderCarousel from './modules/sliderCarousel';
import sendForm from './modules/sendForm';

// Бургер меню
burgerMenu();
// Выбор клуба из падающего меню
chooseClubBtn();
// Стрелка возврата наверх
upArrowBtn();
// Всплывающие модальные окна
showPopup();
// Калькулятор
calculator();
// Главный слайдер
mainSlider();
// Фотогалерея
photoGallerySlider();
// Слайдер карусель
sliderCarousel();
// Отправка данных с формы
sendForm();