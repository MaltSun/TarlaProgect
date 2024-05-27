document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("loginPassword").value;

    fetch("../data.json")
      .then((response) => response.json())
      .then((users) => {
        const foundUser = users.find(
          (user) => user.nickname === username && user.password === password
        );

        if (foundUser) {
          window.location.href = "../Tarla/index.html";
        } else {
          alert("Неверный логин или пароль!");
        }
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
      });
  });

  const authorized = false;
  if (authorized) {
    window.location.href = "../Tarla/index.html";
  }
});
