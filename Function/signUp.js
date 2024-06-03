document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const dobInput = document.getElementById("dob");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const fullnameInput = document.getElementById("fullname");
  const nicknameInput = document.getElementById("nickname");
  const agreementCheckbox = document.getElementById("agreement");
  const regenerateButton = document.getElementById("regenerateNickname");
  const successMessage = document.getElementById("successMessage");
  const button = document.getElementById("submit");
  let nicknameAttempts = 0;

  function readDataFromFileAndSaveToLocalStorage(filename) {
    fetch(filename)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("userData", JSON.stringify(data));
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }

  function writeDataToServer(filename) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      console.error("No user data found in localStorage");
      return;
    }
    fetch(filename, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("User data saved to server:", data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }

  function generateNickname() {
    const adjectives = ["Cool", "Super", "Best", "Great", "Smart"];
    const nouns = ["User", "Player", "Coder", "Dev", "Gamer"];
    const number = Math.floor(Math.random() * 1000);
    return (
      adjectives[Math.floor(Math.random() * adjectives.length)] +
      nouns[Math.floor(Math.random() * nouns.length)] +
      number
    );
  }

  nicknameInput.value = generateNickname();

  regenerateButton.addEventListener("click", function () {
    if (nicknameAttempts < 5) {
      nicknameInput.value = generateNickname();
      nicknameAttempts++;
    } else {
      nicknameInput.removeAttribute("readonly");
      regenerateButton.setAttribute("disabled", true);
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    // Валидация номера телефона
    const phoneRegex = /^(\+375|80)(25|29|33|44)\d{7}$/;
    if (!phoneRegex.test(phoneInput.value)) {
      isValid = false;
      alert( "Введите корректный номер телефона РБ.");
    } else {
      document.getElementById("phoneError").textContent = "";
    }

    // Валидация даты рождения
    const today = new Date();
    const birthDate = new Date(dobInput.value);
    const age = today.getFullYear() - birthDate.getFullYear();
    if (
      age < 16 ||
      (age === 16 &&
        today < new Date(birthDate.setFullYear(today.getFullYear())))
    ) {
      alert("Пользователю должно быть не менее 16 лет.");
      isValid = false;
      } else {
      document.getElementById("dobError").textContent = "";
    }

    // Валидация пароля
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    const commonPasswords = [
      "123456",
      "password",
      "123456789",
      "12345678",
      "12345",
    ];

    if (!passwordRegex.test(password) || commonPasswords.includes(password)) {
      alert("Пароль должен содержать 8-20 символов, включая заглавную и строчную буквы, цифру и специальный символ, и не должен входить в топ-100.");
      isValid = false;
     } else if (password !== confirmPassword) {
      alert("Пароли не совпадают.");
      isValid = false;          
    } else {
      document.getElementById("passwordError").textContent = "";
      document.getElementById("confirmPasswordError").textContent = "";
    }
    // Проверка согласия
    if (!agreementCheckbox.checked) {
      alert("Необходимо прочитать и согласиться с условиями.");
      isValid = false;
    } else {
      document.getElementById("agreementError").textContent = "";

      if (isValid) {
        const userData = JSON.parse(localStorage.getItem("userData")) || [];
        const newUser = {
          fullName: fullnameInput.value,
          nickname: nicknameInput.value,
          phoneNumber: phoneInput.value,
          email: emailInput.value,
          birthDate: dobInput.value,
          password: passwordInput.value,
          post: "",
        };

        const userExists = userData.some(
          (user) =>
            user.email === newUser.email || user.phoneNumber === newUser.phoneNumber
        );

        if (userExists) {
          isValid = false;
          alert("Аккаунт с таким email или номером телефона уже существует!");
        } else {
          document.getElementById("accountError").textContent = "";

          userData.push(newUser);
          localStorage.setItem("userData", JSON.stringify(userData));

          alert("Вы успешно зарегистрированы!");
          window.location.href = "../Tarla/index.html";
        }
      }
    }
  });

});
