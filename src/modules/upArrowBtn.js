const upArrowBtn = () => {
  const toTopBtn = document.querySelector('#totop'),
        firstSection = document.querySelector('section'),
        distToTop = firstSection.getBoundingClientRect().top;

  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > distToTop) {
      toTopBtn.style.display = 'block';
    } else {
        toTopBtn.style.display = 'none';
    }
  });
}

export default upArrowBtn;