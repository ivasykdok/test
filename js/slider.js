$(document).ready(function () {
  $('.discount_slider').slick({
    dots: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
  $('.popular_content__slider').slick({
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  });
});
