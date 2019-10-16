var cart = document.querySelector(".js-show-modal");
var popup = document.querySelector(".modal-cart");
var overlay = document.querySelector(".page-overlay");

var togglebutton = document.getElementById('toggle-button');
var mainnav = document.querySelector('.main-nav');
var sitelist = document.querySelector('.site-list');
var sitelistuser = document.querySelector('.site-list-user');

if (mainnav && mainnav.classList.contains('main-nav--closed')) {
  mainnav.classList.remove('main-nav--closed');
  togglebutton.classList.toggle('main-nav__toggle');

  if (sitelist && sitelistuser) {
    sitelist.classList.add('site-list--closed');
    sitelistuser.classList.add('site-list-user--closed');
  }
}

if (togglebutton) {
  togglebutton.addEventListener('click', function(event) {
    event.preventDefault();
    sitelist.classList.toggle('site-list--closed');
    sitelistuser.classList.toggle('site-list-user--closed');
    togglebutton.classList.toggle('main-nav__toggle');
    togglebutton.classList.toggle('main-nav__toggle--off');
  });
}


cart.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.add("modal-cart__show");
    overlay.classList.add("page-overlay__show");
});

overlay.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.remove("modal-cart__show");
    overlay.classList.remove("page-overlay__show");
});

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
        evt.preventDefault();
        popup.classList.remove("modal-cart__show");
        overlay.classList.remove("page-overlay__show");
    }
});
