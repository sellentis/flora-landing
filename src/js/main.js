document.addEventListener("DOMContentLoaded", function () {
  const burger = document.getElementById("burger")
  const menu = document.getElementById("menu")
  const body = document.querySelector("body")
  burger.addEventListener("click", function (e) {
    e.preventDefault();
    body.classList.toggle("menuOpened")
    burger.classList.toggle('header__burger--active')
    menu.classList.toggle('header__nav--active')
  });

  var swiper = new Swiper(".businessSwiper", {
    pagination: {
      el: ".business-pagination"
    }
  });
});
