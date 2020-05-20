const mainSlider = () => {
  const headSlider = document.querySelector('.head-slider'),
        mainSlider = document.querySelector('.main-slider'),
        slides = mainSlider.querySelectorAll('.slide');
  let currentSlide = 0;
  console.log(mainSlider);
  
  
  const autoPlay = () => {
    slides[currentSlide].style.display = 'none';
    currentSlide++;

    if (currentSlide >= (slides.length - 1))
      currentSlide = 0;

    slides[currentSlide].style.display = 'flex';
  }

  setInterval(autoPlay, 2000); 
}

export default mainSlider;