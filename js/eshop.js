$('document').ready(function () {
  loadCart();
});

function loadCart() {
  // завантаження товарів на сторінку
  $.getJSON('cart.json', function (data) {
    // console.log(data);
    let out = '';
    for(let key in data) {
      out += '<div class="discount_slider__item">';
      //insert image
      out += '<div class="discount_slider__item___img">';
        out += '<img src="'+data[key].image+'" alt="'+data[key].name+'">';
      out += '</div>';
      //end image

      //insert description
      out += '<div class="discount_slider__item___name">';
        out += '<span>' + data[key].description + '</span>';
      out += '</div>';
      //end description

      //insert price
      out += '<div class="discount_slider__item___price">';
        out += '<span class="discount_slider__item___price_a">' + '$' + data[key].coast  + '</span>';
        out += '<span class="discount_slider__item___price_b">' + '$' + data[key].coast_b  + '</span>';
      out += '</div>';
      //end price

      //btn
      out += '<button class="btn discount_slider__item___btn">';
        out += '<img src="'+ data[key].btnImg+'" alt="Supermarket">';
        out += '<span>Add Tod Cart</span>'
      out += '</button>';
      //end btn

      out += '</div>';

    }
    $('.discount_slider').html(out);
  });
}
