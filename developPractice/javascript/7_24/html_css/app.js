var swiper1 = new Swiper(".myList", {
  slidesPerView: 1,
  spaceBetween: 30,
  centeredSlides: true,
  pagination: {
    el: ".pgList",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 5,
    },
    1200: {
      slidesPerView: 7,
    },
  },
});

var sec3TextSlide = new Swiper(".sec3TextSlide", {
  slidesPerView: 1,
  spaceBetween: 30,
});

var sec3MemverSlide = new Swiper(".sec3MemverSlide", {
  slidesPerView: 3,
  spaceBetween: 30,
});

var sec3MemverSlide = new Swiper(".sec3MemverSlide", {
  slidesPerView: 5,
  spaceBetween: 30,
  navigation: {
    nextEl: ".sec3MemverSlide .swiper-button-next",
    prevEl: ".sec3MemverSlide .swiper-button-prev",
  },
});
