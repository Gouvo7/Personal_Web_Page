document.addEventListener("DOMContentLoaded", function() {
  const typingTextElements = document.getElementsByClassName("typing-text");
  let currentElementIndex = 0;
  let currentTextIndex = 0;

  function type() {
    if (currentElementIndex < typingTextElements.length) {
      const currentElement = typingTextElements[currentElementIndex];
      const text = currentElement.dataset.text;

      if (currentTextIndex < text.length) {
        const char = text[currentTextIndex];
        currentElement.innerHTML += char === '\n' ? '<br>' : char;
        currentTextIndex++;
        setTimeout(type, 50); // Adjust typing speed here
      } else {
        // Move to next element
        currentElementIndex++;
        currentTextIndex = 0;
        setTimeout(type, 1000); // Delay before starting the next element
      }
    }
  }

  // Store the text content in a data attribute and clear the initial text content
  for (let element of typingTextElements) {
    element.dataset.text = element.textContent;
    element.textContent = '';
  }

  // Start typing for the first element
  type();
});

function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

var scrollEnabled = false;

document.addEventListener("DOMContentLoaded", function() {
  const getStartedSection = document.querySelector(".get_started");

  getStartedSection.addEventListener("click", function() {
      document.getElementById("about").scrollIntoView({ behavior: "smooth" });
  });
});