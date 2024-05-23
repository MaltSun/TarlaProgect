const popupLinks = document.querySelectorAll(".popupAuthorization");
const registrationLinks = document.querySelectorAll(".popupRegistration");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;
const timeout = 800;

function addPopupListeners(popupLinks, popupId) {
  if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
      const popLink = popupLinks[index];
      popLink.addEventListener("click", function (e) {
        const curentPopup = document.getElementById(popupId);
        popupOpen(curentPopup);
        e.preventDefault();
      });
    }
  }
}

function addCloseListeners(closeClass, popupClass) {
  const popupCloseIcons = document.querySelectorAll(closeClass);
  if (popupCloseIcons.length > 0) {
    for (let index = 0; index < popupCloseIcons.length; index++) {
      const el = popupCloseIcons[index];
      el.addEventListener("click", function (e) {
        popupClose(el.closest(popupClass));
        e.preventDefault();
      });
    }
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector(".popup.open");
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodylock();
    }
    curentPopup.classList.add("open");
    curentPopup.addEventListener("click", function (e) {
      if (!e.target.closest(".popupContent")) {
        popupClose(e.target.closest(".popup"));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove("open");
    if (doUnlock) {
      bodyUnlock();
    }
  }
}

function bodylock() {
  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
    }
  }
  body.classList.add("lock");

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnlock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = "0px";
      }
    }
    body.style.paddingRight = "0px";
    body.classList.remove("lock");
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const popupActive = document.querySelector(".popup.open");
    popupClose(popupActive);
  }
});

addPopupListeners(popupLinks, "popup");
addPopupListeners(registrationLinks, "popup2");
addCloseListeners(".closePopup", ".popup");
