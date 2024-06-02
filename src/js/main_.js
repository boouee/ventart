import "./_vendor";
import vars from "./_vars";
import "./_functions";
import "./_components";

// if (window.matchMedia("(max-width: 1024px)").matches) {
//   const sliders = document.querySelectorAll(".popular__container");
//   sliders.forEach((slider) => {
//     const popularItemsLength = slider.querySelectorAll(".popular-item").length;
//     const btnMore = slider.querySelector(".popular__more");

//     let items = 3;
//     const arr = Array.from(slider.querySelector(".popular__items").children);
//     const visItems = arr.slice(0, items);
//     visItems.forEach((item) => item.classList.add("is-visible"));

//     btnMore.addEventListener("click", (e) => {
//       items += 3;

//       const visItems = arr.slice(0, items);
//       visItems.forEach((item) => item.classList.add("is-visible"));

//       if (visItems.length == popularItemsLength) {
//         btnMore.style.display = "none";
//       }
//     });
//   });
// }
const header = document.querySelector(".header");
const mBtn = document.querySelector(".header__m");

mBtn.addEventListener("click", (e) => {
  let isActive = mBtn.classList.toggle("active");

  if (isActive) {
    header.style.transform = "translateY(0)";
    header.classList.remove("logo-down");
  } else {
    header.style.transform = "translateY(-50%)";
    header.classList.add("logo-down");
  }
});

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};
window.addEventListener("resize", appHeight);
appHeight();
