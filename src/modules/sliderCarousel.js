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
  } else if (document.documentElement.clientWidth < 600 && document.documentElement.clientWidth >= 400){
      // 3 слайда на странице
      slides.forEach(item => {
        item.style.cssText = 'flex: 0 0 32.3%; transform: translateX(0px); transition: all 0.5s';
      })
  } else if (document.documentElement.clientWidth < 400) {
      // 1 слайд на странице
      slides.forEach(item => {
        item.style.cssText = 'flex: 0 0 100%; margin-right: 10%; transform: translateX(0px); transition: all 0.5s';
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

export default sliderCarousel;