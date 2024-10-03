window.addEventListener("scroll", setScrollVar)
window.addEventListener("resize", setScrollVar)
function setScrollVar(){
    const htmlElement = document.documentElement
    const percentOfScreenHeightScrolled = html.Element.scrollTop / htmlElement.clientHeight
    htmlElement.style.setProperty('--scroll', Math.min(percentOfScreenHeightScrolled * 100, 100))
  }

setScrollVar()