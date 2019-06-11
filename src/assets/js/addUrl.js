import axios from "axios";
const addBtn = document.getElementById("jsAddUrl");
const closeBtn = document.getElementById("jsClose");

const clickAddUrl = event => {
  event.preventDefault();
  document.querySelector(".bg-modal").style.display = "flex";
};

const clickCloseAddUrl = event => {
  event.preventDefault();
  document.querySelector(".bg-modal").style.display = "none";
};

async function init() {
  addBtn.addEventListener("click", clickAddUrl);
  closeBtn.addEventListener("click", clickCloseAddUrl);
}

if (addBtn) {
  init();
}
