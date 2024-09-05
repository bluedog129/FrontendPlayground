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
  navigation: {
    nextEl: ".memberNextBtn",
    prevEl: ".memberPrevBtn",
  },
});

var sec3MemberSlide = new Swiper(".sec3MemberSlide", {
  slidesPerView: 5,
  spaceBetween: 30,
  navigation: {
    nextEl: ".memberNextBtn",
    prevEl: ".memberPrevBtn",
  },
});

sec3TextSlide.controller.control = sec3MemberSlide;
sec3MemberSlide.controller.control = sec3TextSlide;
