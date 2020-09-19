'use strict';
let cart = {}; // my cart
$('document').ready(function () {
  loadGoods();
  checkCart();
  showMinCart();
});

function loadGoods() {
  // loading goods per page
  $.getJSON('goods.json', function (data) {
    let out = '';
    let popular = '';

    for (let key in data) {
      if (data[key].popular === false) {
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
      } else {
        popular += '<div class="popular_content__block___item">';
        popular += '<div class="popular_content__block___item____img">';
        popular += '<img src="' + data[key].image + '" alt="' + data[key].name + '" />';
        popular += '</div>';
        popular += '<div class="popular_content__block___item___text">';
        popular += '<div class="popular_content__block___item___text_name">' + data[key].description + '</div>';
        popular += '<div class="popular_content__block___item___text_price">' + '$' + data[key].coast + '</div>';
        popular += '<button class="popular_content__block___item___text_btn btn" data-id="' + key + '">';
        popular += '<i class="btn_i"></i>Add Tod Cart';
        popular += '</button>';
        popular += '</div>';
        popular += '</div>';
      }
    }
    $('.discount_slider').slick('slickAdd', out);
    $('.popular_content__block').html(popular);
    $('button.popular_content__block___item___text_btn').on('click', addToCart);
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
    showMinCart();
    checkCart();
  }
}

function showMinCart() {
  let total = 0; // total
  let sum = 0; // quantity of goods

  $.getJSON('goods.json', function (data) {
    let goods = data; // all items in the cart

    if ($.isEmptyObject(cart)) {
      let out = 'Порожньо :(';
      $('#modalCart').html(out);
    } else {
      let out = '';
      for (let key in cart) {
        out += '<div class="cart">';
        out += '<button class="delete" data-id="' + key + '">x</button>';
        out += '<div class="cart_img">';
        out += '<img src="' + goods[key].image + '" alt="' + goods[key].name + '"/>';
        out += '</div>';
        out += '<div class="cart_name">' + goods[key].name + '</div>';
        out += '<button class="minus" data-id="' + key + '">-</button>';
        out += '<div class="cart_number">' + cart[key] + '</div>';
        out += '<button class="plus" data-id="' + key + '">+</button>';
        out += '<div class="cart_total">';
        out += '<div class="cart_total__currency">$</div>' + cart[key] * goods[key].coast + '</div>';
        out += '</div>';
      }
      $('#modalCart').html(out);
      $('.plus').on('click', plusGoods);
      $('.minus').on('click', minusGoods);
      $('.delete').on('click', deleteGoods);
    }

    for (let key in data) {
      for (let el in cart) {
        if (el === key) {
          total += data[key].coast * cart[key];
          sum += cart[key];
        }
      }
      document.querySelector('.main_navbar__cart___text___subtitle_total').innerHTML = `$ ${total}`;
      document.querySelector('.main_navbar__cart___text___subtitle_length').innerHTML = `(${sum})`;
    }
  });

  // $.getJSON('popular.json', function (data) {
  //   let popular = data; // all items in the cart
  //   console.log(popular);
  //   if ($.isEmptyObject(cart)) {
  //     let out = 'Порожньо :(';
  //     $('#modalCart').html(out);
  //   } else {
  //     let out = '';
  //     for (let key in cart) {
  //       out += '<div class="cart">';
  //       out += '<button class="delete" data-id="' + key + '"></button>';
  //       out += '<div class="cart_img">';
  //       out += '<img src="' + popular[key].image + '" alt="' + popular[key].name + '"/>';
  //       out += '</div>';
  //       out += '<div class="cart_name">' + popular[key].name + '</div>';
  //       out += '<button class="minus" data-id="' + key + '">-</button>';
  //       out += '<div class="cart_number">' + cart[key] + '</div>';
  //       out += '<button class="plus" data-id="' + key + '">+</button>';
  //       out += '<div class="cart_total">';
  //       out += '<div class="cart_total__currency">$</div>' + cart[key] * popular[key].coast + '</div>';
  //       out += '</div>';
  //     }
  //     $('#modalCart').html(out);
  //     $('.plus').on('click', plusGoods);
  //     $('.minus').on('click', minusGoods);
  //     $('.delete').on('click', deleteGoods);
  //   }
  //   for (let key in data) {
  //     for (let el in cart) {
  //       if (el === key) {
  //         total += data[key].coast * cart[key];
  //         sum += cart[key];
  //       }
  //     }
  //     document.querySelector('.main_navbar__cart___text___subtitle_total').innerHTML = `$ ${total}`;
  //     document.querySelector('.main_navbar__cart___text___subtitle_length').innerHTML = `(${sum})`;
  //   }
  // });
}

function plusGoods() {
  let articul = $(this).attr('data-id');
  cart[articul]++;
  saveCartToLS(); // save the recycle bin in localStorage
  showMinCart();
}

function minusGoods() {
  let articul = $(this).attr('data-id');
  if (cart[articul] > 1) {
    cart[articul]--;
  } else delete cart[articul];
  saveCartToLS(); // save the recycle bin in localStorage
  showMinCart();
}

function deleteGoods() {
  let articul = $(this).attr('data-id');
  delete cart[articul];
  saveCartToLS(); // save the recycle bin in localStorage
  showMinCart();
}

function checkCart() {
  // check the basket in localstorage
  if (localStorage.getItem('cart') != null) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }
}

function saveCartToLS() {
  // save the recycle bin in localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}
