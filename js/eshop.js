$('document').ready(function () {
  loadCart();
});

function loadCart() {
  // завантаження товарів на сторінку
  $.getJSON('cart.json', function (data) {
    console.log(data);
  });
}
