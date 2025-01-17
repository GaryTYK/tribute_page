/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");
const dropdownItem = document.querySelectorAll(".dropdown-item");

function linkAction(event) {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  if (event.target.id != "nav_languages") {
    navMenu.classList.remove("show");
  }
}

navLink.forEach((n) => n.addEventListener("click", linkAction));
dropdownItem.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 1000,
  delay: 100,
  //     reset: true
});

sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text", {});
sr.reveal(".home__img, .about__subtitle, .about__text, .skills__img", {
  delay: 50,
});
sr.reveal(".home__social-icon, #timeline-content", {
  interval: 100,
});
sr.reveal(".skills__data, .contact__input, .swiper", { delay: 50 });

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  let top_button = document.getElementById("top_button");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    top_button.style.display = "block";
  } else {
    top_button.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Get all dropdown items
const dropdownItems = document.querySelectorAll(".dropdown-item");
var xhr = new XMLHttpRequest(); //Create an xhr instance
var translator = new MultiLanguage(); // define translator, create a default instance
translator.registerSelect(document.getElementById("language_select")); //register select(s)

// Add event listener to each dropdown item
dropdownItems.forEach((item) => {
  item.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default link behavior
    const href = this.getAttribute("href");
    const languageCode = href.substring(1); // Remove the leading '#'

    document.getElementById("language_select").value = languageCode;
    document
      .getElementById("language_select")
      .dispatchEvent(new Event("change"));
  });
});

xhr.open(
  "GET",
  "https://garytyk.github.io/my-personal-portfolio/assets/lang/main.json"
); // Define target file and HTTP method to use.

xhr.onreadystatechange = (e) => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var jsonResponse = JSON.parse(xhr.responseText); // get response text and parse it into JSON.

    translator.addSheet(jsonResponse);
  }
};
xhr.send();

const swiper = new Swiper(".swiper", {
  // Optional parameters
  loop: true,
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
