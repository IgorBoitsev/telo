const photoGallerySlider = () => {
  const gallerySlider = document.querySelector('.gallery-slider'),
        slides = gallerySlider.querySelectorAll('.slide'),
        sliderDots = gallerySlider.querySelector('.slider-dots');
  
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

export default photoGallerySlider;