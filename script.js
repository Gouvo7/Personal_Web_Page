function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
}

var scrollEnabled = false;

document.addEventListener("DOMContentLoaded", function () {
  const getStartedSection = document.querySelector(".get_started");

  getStartedSection.addEventListener("click", function () {
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElementsLeft = document.querySelectorAll(".hidden_left");
hiddenElementsLeft.forEach((el) => observer.observe(el));

const hiddenElementsRight = document.querySelectorAll(".hidden_right");
hiddenElementsRight.forEach((el) => observer.observe(el));
