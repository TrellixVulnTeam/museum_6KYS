export function createHeaderModal() {
  const burger = document.querySelector(".header__burger");
  burger.addEventListener("click", () => {
    const firstLine = document.querySelector(".first");
    const secondLine = document.querySelector(".second");
    const thirdLine = document.querySelector(".third");
    const forthLine = document.querySelector(".forth");
    const welcomeBody = document.querySelector(".welcome__body");
    const modalHeader = document.querySelector(".modal__header");

    firstLine.classList.toggle("first--active");
    secondLine.classList.toggle("second--active");
    thirdLine.classList.toggle("third--active");
    forthLine.classList.toggle("forth--active");
    welcomeBody.classList.toggle("welcome__body--none");
    modalHeader.classList.toggle("modal__header--active");
  });
}
