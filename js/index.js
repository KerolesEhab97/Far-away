var loginBtn = document.querySelector("#loginBtn");
var userEmail = document.querySelector("#userEmail");
var userPassword = document.querySelector("#userPassword");
var alertContainer = document.querySelector(".alertContainer");
var alertItem = document.querySelector(".alertItem");
var close = document.querySelector("#close");

var usersList = [];

if (localStorage.getItem("usersList")) {
  usersList = JSON.parse(localStorage.getItem("usersList"));
}

loginBtn.addEventListener("click", login);
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

function login() {
  var islogged = false;

  if (isEmpty() != true) {
    if (validateEmail() == true && validatePassword() == true) {
      for (var i = 0; i < usersList.length; i++) {
        if (
          userEmail.value == usersList[i].email &&
          userPassword.value == usersList[i].password
        ) {
          Toastify({
            text: "logged in successfully",
            duration: 2000,
            gravity: "top",
            position: "right",
            style: {
              background: "#ff6723",
            },
          }).showToast();

          localStorage.setItem("loggedEmail", usersList[i].email);

          setTimeout(function () {
            window.location.replace("./home.html");
          }, 2000);

          islogged = true;
          return true;
        }
      }

      if (islogged == false) {
        displayError(
          `Email or pass is incorrect <br/> If you dont have account <br/><a href="./register.html">Click Here</a>`
        );
      }
    }
  }
}

function isEmpty() {
  if (userPassword.value == "" || userEmail.value == "") {
    displayError("all inputs is required");

    return true;
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

function displayError(message) {
  alertContainer.classList.replace("d-none", "d-block");

  alertMsg.innerHTML = message;
}
