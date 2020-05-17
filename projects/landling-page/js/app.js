const sections = document.querySelectorAll("section");
const navbar = document.querySelector("#navbar__list");

function activeElement() {}

// build the nav
function addSections() {
  for (let sect of sections) {
    let section = document.createElement("li");
    section.className = "menu__link";
    section.dataset.nav = sect.id;
    section.innerText = sect.dataset.nav;
    navbar.appendChild(section);
  }
}

// check and set the class Active
function setActive() {
  window.addEventListener("scroll", function (event) {
    maxSection = sections[0];
    minVal = 100000;
    for (const all__items of sections) {
      let bounding = all__items.getBoundingClientRect();
      if ((bounding.top > -400) & (bounding.top < minVal)) {
        minVal = bounding.top;
        maxSection = all__items;
      }
    }
    maxSection.classList.add("your-active-class");
    // set other sections as inactive
    for (let all__item of sections) {
      if (
        (all__item.id != maxSection.id) &
        all__item.classList.contains("your-active-class")
      ) {
        all__item.classList.remove("your-active-class");
      }
    }
    const active = document.querySelector(
      'li[data-nav="' + maxSection.id + '"]'
    );
    active.classList.add("active__link");
    // remove from other headers
    const headers = document.querySelectorAll(".menu__link");
    for (let all__item of headers) {
      console.log(all__item);
      if (
        (all__item.dataset.nav != active.dataset.nav) &
        all__item.classList.contains("active__link")
      ) {
        all__item.classList.remove("active__link");
      }
    }
  });
}

// Scroll on click in section id
function scrollOnClick() {
  navbar.addEventListener("click", function (event) {
    const clicked = document.querySelector("#" + event.target.dataset.nav);
    clicked.scrollIntoView();
  });
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
addSections();
// Scroll to section on link click
scrollOnClick();
// Set sections as active
setActive();
