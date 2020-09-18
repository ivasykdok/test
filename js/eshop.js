'use strict';
let cart = {}; // my cart

$('document').ready(function () {
  loadCart();
  checkCart();
  showMinCart();
});

function loadCart() {
  // завантаження товарів на сторінку
  $.getJSON('cart.json', function (data) {
    // console.log(data);
    let out = '';
    for (let key in data) {
      // insert item
      out += '<div class="discount_slider__item">';

      //insert image
      out += '<div class="discount_slider__item___img">';
      out += '<img src=" ' + data[key].image + ' " alt=" ' + data[key].name + ' ">';
      out += '</div>';

      //insert description
      out += '<div class="discount_slider__item___name">';
      out += '<span>' + data[key].description + '</span>';
      out += '</div>';

      //insert price
      out += '<div class="discount_slider__item___price">';
      out += '<span class="discount_slider__item___price_a">' + '$' + data[key].coast + '</span>';
      out += '<span class="discount_slider__item___price_b">' + '$' + data[key].coast_b + '</span>';
      out += '</div>';

      // insert btn
      out += '<button class="btn discount_slider__item___btn" data-id="' + key + '">';
      out += '<i class="btn_i"></i>Add Tod Cart';
      out += '</button>';

      out += '</div>';
    }
    $('.discount_slider').slick('slickAdd', out);
    $('button.discount_slider__item___btn').on('click', addToCart);
  });
}

function addToCart(event) {
  // insert in cart
  if (event.target.classList.contains('btn') || event.target.classList.contains('btn_i')) {
    let articul = event.target.dataset.id;
    if (cart[articul] != undefined) {
      cart[articul]++;
    } else {
      cart[articul] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    // console.log(cart);
    showMinCart();
  }
}

function checkCart() {
  // check the basket in localstorage
  if (localStorage.getItem('cart') != null) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }
}

function showMinCart() {
  // show cart contents
  let out = '';
  for (let key in cart) {
    out += key + ' --- ' + cart[key] + '<br>';
  }
  $('.main_navbar__cart___text___subtitle').html(out);
}
