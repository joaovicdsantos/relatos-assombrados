const btnMenu = document.querySelector('.btn-menu-mobile');
const mobileMenu = document.querySelector('.menu-mobile');
const openIcon = document.querySelector('.open-icon');
const closeIcon = document.querySelector('.close-icon');
const animacaoTempo = 0.3;

btnMenu.addEventListener('click', () => {
  btnMenu.style.animation = '';
  btnMenu.offsetWidth;
  if (closeIcon.classList.contains('hide')) {
    mobileMenu.style.width = '80vw';
    btnMenu.style.animation = `girinho ${animacaoTempo}s`;
    setTimeout(() => {
      closeIcon.classList.remove('hide');
      openIcon.classList.add('hide');
    }, (animacaoTempo / 2) * 1000);
  } else {
    mobileMenu.style.width = '0';
    btnMenu.style.animation = `girinho ${animacaoTempo}s`;
    setTimeout(() => {
      closeIcon.classList.add('hide');
      openIcon.classList.remove('hide');
    }, (animacaoTempo / 2) * 1000);
  }
});
