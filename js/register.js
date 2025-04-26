var userName = document.querySelector("#userName");
var userEmail = document.querySelector("#userEmail");
var userPassword = document.querySelector("#userPassword");
var registerBtn = document.querySelector("#registerBtn");
var alertContainer = document.querySelector(".alertContainer");
var alertItem = document.querySelector(".alertItem");
var alertMsg = document.querySelector("#alertMsg");
var close = document.querySelector("#close");
var myForm = document.querySelector("form");
var usersList = [];

if (localStorage.getItem("usersList")) {
  usersList = JSON.parse(localStorage.getItem("usersList"));
}

// ! Events **************************
myForm.addEventListener("submit", register);
close.addEventListener("click", function () {
  alertContainer.classList.replace("d-block", "d-none");
});
alertContainer.addEventListener("click", function () {
  alertContainer.classList.replace("d-block", "d-none");
});
alertItem.addEventListener("click", function (e) {
  e.stopPropagation();
});
userEmail.addEventListener("input", validateEmail);
userPassword.addEventListener("input", validatePassword);

// ! Functions ***********************
function register(event) {
  event.preventDefault();

  if (isEmpty() != true) {
    if (validateEmail() == true && validatePassword() == true) {
      if (isExist() != true) {
        var user = {
          name: userName.value,
          email: userEmail.value,
          password: userPassword.value,
        };

        usersList.push(user);
        localStorage.setItem("usersList", JSON.stringify(usersList));

        Toastify({
          text: "Account created successfully",
          duration: 2000,
          gravity: "top",
          position: "right",
          style: {
            background: "#ff6723",
          },
        }).showToast();
        setTimeout(function () {
          window.location.replace("./index.html");
        }, 2000);
      }
    } else {
      displayError("All input must be valid");
    }
  }
}

function isEmpty() {
  if (
    userName.value == "" ||
    userPassword.value == "" ||
    userEmail.value == ""
  ) {
    displayError("All inputs is required");

    return true;
  }
}

function displayError(message) {
  alertContainer.classList.replace("d-none", "d-block");

  alertMsg.innerHTML = message;
}

function isExist() {
  for (var i = 0; i < usersList.length; i++) {
    if (userEmail.value == usersList[i].email) {
      displayError("Email already exist!");

      return true;
    }
  }
}

function validateEmail() {
  var regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  var text = userEmail.value;

  if (regex.test(text)) {
    userEmail.classList.add("is-valid");
    userEmail.classList.remove("is-invalid");

    return true;
  } else {
    userEmail.classList.add("is-invalid");
    userEmail.classList.remove("is-valid");

    return false;
  }
}

function validatePassword() {
  var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  var text = userPassword.value;

  if (regex.test(text)) {
    userPassword.classList.add("is-valid");
    userPassword.classList.remove("is-invalid");

    return true;
  } else {
    userPassword.classList.add("is-invalid");
    userPassword.classList.remove("is-valid");

    return false;
  }
}
