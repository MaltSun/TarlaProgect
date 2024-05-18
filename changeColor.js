document.addEventListener("DOMContentLoaded", function() {
  const lightThemeBtn = document.getElementById("light-theme-btn");
  const darkThemeBtn = document.getElementById("dark-theme-btn");
  const themeElements = document.querySelectorAll(".theme-element");
  const specialElements = document.querySelectorAll(".theme-specialElement");
  const specialButtons = document.querySelectorAll(".theme-blueButton");
  const buttons = document.querySelectorAll(".theme-button");

  function applyTheme(theme) {
    if (theme === "dayMode") {
      themeElements.forEach(function(element) {
        element.classList.add("dayMode");
        element.classList.remove("nightMode");
      });
      specialElements.forEach(function(element) {
        element.classList.add("dayMode");
        element.classList.remove("nightMode");
      });
      specialButtons.forEach(function(element) {
        element.classList.add("dayMode");
        element.classList.remove("nightMode");
      });
      buttons.forEach(function(element) {
        element.classList.add("dayMode");
        element.classList.remove("nightMode");
      });
    } else if (theme === "nightMode") {
      themeElements.forEach(function(element) {
        element.classList.add("nightMode");
        element.classList.remove("dayMode");
      });
      specialElements.forEach(function(element) {
        element.classList.add("nightMode");
        element.classList.remove("dayMode");
      });
      specialButtons.forEach(function(element) {
        element.classList.add("nightMode");
        element.classList.remove("dayMode");
      });
      buttons.forEach(function(element) {
        element.classList.add("nightMode");
        element.classList.remove("dayMode");
      });
    }
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    applyTheme(savedTheme);
  }

  lightThemeBtn.addEventListener("click", function() {
    applyTheme("dayMode");
    localStorage.setItem("theme", "dayMode");
  });

  darkThemeBtn.addEventListener("click", function() {
    applyTheme("nightMode");
    localStorage.setItem("theme", "nightMode");
  });
});
