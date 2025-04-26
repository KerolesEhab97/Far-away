var itemName = document.querySelector("#itemName");
var addBtn = document.querySelector("#addBtn");
var updateBtn = document.querySelector("#updateBtn");
var loggedEmail = localStorage.getItem("loggedEmail");
var alertContainer = document.querySelector(".alertContainer");
var alertItem = document.querySelector(".alertItem");
var close = document.querySelector("#close");
var updateIndex;
var itemList = [];

if (localStorage.getItem("itemsList")) {
  itemList = JSON.parse(localStorage.getItem("itemsList"));
  displayItem();
}
// ! Events ****************************
close.addEventListener("click", function () {
  alertContainer.classList.replace("d-block", "d-none");
});
alertContainer.addEventListener("click", function () {
  alertContainer.classList.replace("d-block", "d-none");
});
alertItem.addEventListener("click", function (e) {
  e.stopPropagation();
});
addBtn.addEventListener("click", addProduct);
updateBtn.addEventListener("click", update);

// ! Functions *************************

function addProduct() {
  if (isEmpty() != true) {
    if (isExist() != true) {
      var item = {
        name: itemName.value,
        email: loggedEmail,
      };

      itemList.push(item);
      localStorage.setItem("itemsList", JSON.stringify(itemList));
      clear();
      Toastify({
        text: "Item added successfully",
        duration: 2000,
        gravity: "top",
        position: "right",
        style: {
          background: "#ff6723",
        },
      }).showToast();

      displayItem();
    }
  }
}
function displayItem() {
  var cartona = "";

  for (var i = 0; i < itemList.length; i++) {
    if (loggedEmail == itemList[i].email) {
      cartona += `
        <tr>
            <td>${i + 1}</td>
            <td>${itemList[i].name}</td>
            <td>
              <button onclick='deleteItem(${i})' class="btn btn-danger">delete</button>
            </td>
            <td>
              <button onclick='kobry(${i})' class="btn btn-warning">update</button>
            </td>
        </tr>
        `;
    }
  }

  document.querySelector("#data").innerHTML = cartona;
}
function deleteItem(index) {
  itemList.splice(index, 1);
  displayItem();
  localStorage.setItem("itemsList", JSON.stringify(itemList));

  Toastify({
    text: "Item deletd successfully",
    duration: 2000,
    gravity: "top",
    position: "right",
    style: {
      background: "#ff6723",
    },
  }).showToast();
}
function kobry(index) {
  updateIndex = index;
  itemName.value = itemList[index].name;

  addBtn.classList.replace("d-block", "d-none");
  updateBtn.classList.replace("d-none", "d-block");
}
function update() {
  itemList[updateIndex].name = itemName.value;

  displayItem();
  localStorage.setItem("itemsList", JSON.stringify(itemList));

  Toastify({
    text: "Item updated successfully",
    duration: 2000,
    gravity: "top",
    position: "right",
    style: {
      background: "#ff6723",
    },
  }).showToast();

  addBtn.classList.replace("d-none", "d-block");
  updateBtn.classList.replace("d-block", "d-none");

  clear();
}

function displayError(message) {
  alertContainer.classList.replace("d-none", "d-block");

  alertMsg.innerHTML = message;
}

function clear() {
  itemName.value = null;
}
function isExist() {
  for (var i = 0; i < itemList.length; i++) {
    if (
      itemName.value == itemList[i].name &&
      loggedEmail == itemList[i].email
    ) {
      displayError("Item already exist");
      return true;
    }
  }
}
function isEmpty() {
  if (itemName.value == "") {
    displayError("Item name is required");
    return true;
  }
}
