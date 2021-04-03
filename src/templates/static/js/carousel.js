function createCarousel() {
  const cardsCarousels = document.querySelectorAll('.cards__carousel');
  cardsCarousels.forEach((cardCarousel) => {
    if (!cardCarousel) {
      console.error('Não há nenhum elemento de carousel na página');
      return null;
    }
    const bagulhospararemover = cardCarousel.querySelectorAll(
      '.carousel__container'
    );
    bagulhospararemover.forEach((praremover) => {
      cardCarousel.removeChild(praremover);
    });
    const cards = cardCarousel.querySelector('.cards');
    const card = cardCarousel.querySelector('.card');
    let style = card.currentStyle || window.getComputedStyle(card);
    const divSize = parseInt(style.width);
    const scroll = divSize + parseInt(style.marginRight);

    // Criar botão direito
    const btnChangeRightContainer = document.createElement('div');
    btnChangeRightContainer.classList.add(
      'carousel__container',
      'carousel__container-right'
    );
    btnChangeRightContainer.setAttribute('disabled', 'disabled');
    const btnChangeRightElemn = document.createElement('i');
    btnChangeRightElemn.classList.add('fas', 'fa-chevron-right');
    btnChangeRightContainer.appendChild(btnChangeRightElemn);
    cardCarousel.appendChild(btnChangeRightContainer);

    // Criar botão esquerdo
    const btnChangeLeftContainer = document.createElement('div');
    btnChangeLeftContainer.classList.add(
      'carousel__container',
      'carousel__container-left'
    );
    const btnChangeLeftElemn = document.createElement('i');
    btnChangeLeftElemn.classList.add('fas', 'fa-chevron-left');
    btnChangeLeftContainer.appendChild(btnChangeLeftElemn);
    cardCarousel.appendChild(btnChangeLeftContainer);
    // Clique direito
    btnChangeRightContainer.addEventListener('click', () => {
      btnChangeRightContainer.style.opacity = '0';
      btnChangeLeftContainer.style.opacity = '0';
      setTimeout(() => {
        btnChangeRightContainer.style.display = 'none';
        btnChangeLeftContainer.style.display = 'none';
      }, 300);
      cards.scrollBy({ left: scroll });
      setTimeout(() => {
        btnChangeRightContainer.style.display = 'flex';
        btnChangeLeftContainer.style.display = 'flex';
        if (cards.scrollLeft > 0) {
          btnChangeLeftContainer.style.opacity = '1';
        } else {
          btnChangeLeftContainer.style.opacity = '0';
        }
        if (cards.scrollLeft >= cards.scrollWidth - divSize - 10) {
          btnChangeRightContainer.style.opacity = '0';
        } else {
          btnChangeRightContainer.style.opacity = '1';
        }
      }, 500);
    });
    btnChangeLeftContainer.addEventListener('click', () => {
      btnChangeRightContainer.style.opacity = '0';
      btnChangeLeftContainer.style.opacity = '0';
      setTimeout(() => {
        btnChangeRightContainer.style.display = 'none';
        btnChangeLeftContainer.style.display = 'none';
      }, 300);
      cards.scrollBy({ left: -scroll });
      setTimeout(() => {
        btnChangeRightContainer.style.display = 'flex';
        btnChangeLeftContainer.style.display = 'flex';
        if (cards.scrollLeft > 0) {
          btnChangeLeftContainer.style.opacity = '1';
        } else {
          btnChangeLeftContainer.style.opacity = '0';
        }
        if (cards.scrollLeft >= cards.scrollWidth - divSize - 10) {
          btnChangeRightContainer.style.opacity = '0';
        } else {
          btnChangeRightContainer.style.opacity = '1';
        }
      }, 500);
    });
  });
}
window.onload = () => {
  createCarousel();
};
window.onresize = () => {
  createCarousel();
};
